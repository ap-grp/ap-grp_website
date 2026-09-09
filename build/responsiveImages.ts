import crypto from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { Plugin, ResolvedConfig } from "vite";

const RESPONSIVE_IMAGE_ROUTE = "@responsive-images";
const PIPELINE_VERSION = "3";
const DEFAULT_WIDTHS = [480, 960, 1600, 2400];

interface ResponsiveImagesOptions {
  widths?: number[];
  cacheDirectory?: string;
}

interface GeneratedVariant {
  width: number;
  fileName: string;
  contents: Buffer;
}

type SharpInput = string | Buffer;

/**
 * Some image exporters write baseline JPEGs whose scan header incorrectly says
 * that the spectral selection ends at coefficient 0. Tolerant browser decoders
 * display these files, but libjpeg (and therefore Sharp) correctly rejects them
 * because a sequential scan must cover coefficients 0 through 63.
 *
 * Detect that exact malformed header and repair it in memory. The source asset
 * is left untouched, and no pixel data is decoded or re-encoded by this step.
 */
function repairSequentialJpegScanHeader(source: Buffer): Buffer | null {
  if (source.length < 4 || source[0] !== 0xff || source[1] !== 0xd8) return null;

  let offset = 2;
  let isSequential = false;

  while (offset + 3 < source.length) {
    if (source[offset] !== 0xff) return null;
    while (source[offset] === 0xff) offset += 1;

    const marker = source[offset];
    offset += 1;

    if (marker === undefined || marker === 0xd9) return null;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) continue;
    if (offset + 2 > source.length) return null;

    const segmentLength = source.readUInt16BE(offset);
    const payloadStart = offset + 2;
    const segmentEnd = offset + segmentLength;
    if (segmentLength < 2 || segmentEnd > source.length) return null;

    if (marker === 0xc0 || marker === 0xc1) {
      isSequential = true;
    } else if (marker === 0xc2) {
      isSequential = false;
    } else if (marker === 0xda) {
      if (!isSequential) return null;

      const componentCount = source[payloadStart];
      if (componentCount === undefined) return null;

      const spectralStartOffset = payloadStart + 1 + componentCount * 2;
      const spectralEndOffset = spectralStartOffset + 1;
      const approximationOffset = spectralStartOffset + 2;
      if (approximationOffset >= segmentEnd) return null;

      if (
        source[spectralStartOffset] === 0 &&
        source[spectralEndOffset] === 0 &&
        source[approximationOffset] === 0
      ) {
        const repaired = Buffer.from(source);
        repaired[spectralEndOffset] = 63;
        return repaired;
      }

      return null;
    }

    offset = segmentEnd;
  }

  return null;
}

async function getSharpInput(sourcePath: string): Promise<SharpInput> {
  if (!/\.jpe?g$/i.test(sourcePath)) return sourcePath;

  const handle = await fs.open(sourcePath, "r");
  const header = Buffer.alloc(128 * 1024);

  try {
    const { bytesRead } = await handle.read(header, 0, header.length, 0);
    const repairedHeader = repairSequentialJpegScanHeader(header.subarray(0, bytesRead));
    if (!repairedHeader) return sourcePath;

    const source = await fs.readFile(sourcePath);
    return repairSequentialJpegScanHeader(source) ?? sourcePath;
  } finally {
    await handle.close();
  }
}

function createTaskLimiter(concurrency: number) {
  let activeTasks = 0;
  const waitingTasks: Array<() => void> = [];

  const runNext = () => {
    if (activeTasks >= concurrency) return;
    waitingTasks.shift()?.();
  };

  return function limit<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const run = () => {
        activeTasks += 1;
        task()
          .then(resolve, reject)
          .finally(() => {
            activeTasks -= 1;
            runNext();
          });
      };

      waitingTasks.push(run);
      runNext();
    });
  };
}

const limitImageProcessing = createTaskLimiter(2);
const limitFileHashing = createTaskLimiter(4);

function hashSourceFile(sourcePath: string, relativePath: string) {
  return limitFileHashing(
    () =>
      new Promise<string>((resolve, reject) => {
        const hash = crypto.createHash("sha256").update(PIPELINE_VERSION).update(relativePath);
        const stream = createReadStream(sourcePath);

        stream.on("data", (chunk) => hash.update(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(hash.digest("hex").slice(0, 12)));
      }),
  );
}

function parseResponsiveImageId(id: string): string | null {
  const queryIndex = id.indexOf("?");
  if (queryIndex === -1) return null;

  const filePath = id.slice(0, queryIndex);
  const query = new URLSearchParams(id.slice(queryIndex + 1));
  if (!query.has("responsive") || !/\.(?:jpe?g|png)$/i.test(filePath)) return null;

  return filePath;
}

function getOutputWidths(originalWidth: number, requestedWidths: number[]) {
  const largestWidth = Math.min(originalWidth, Math.max(...requestedWidths));
  return Array.from(
    new Set([...requestedWidths.filter((width) => width < largestWidth), largestWidth]),
  ).sort((a, b) => a - b);
}

function normalizeBase(base: string) {
  return base.endsWith("/") ? base : `${base}/`;
}

function getContentType(fileName: string) {
  if (fileName.endsWith(".avif")) return "image/avif";
  if (fileName.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

export function responsiveImages(options: ResponsiveImagesOptions = {}): Plugin {
  const requestedWidths = options.widths ?? DEFAULT_WIDTHS;
  let resolvedConfig: ResolvedConfig;
  let cacheDirectory = "";
  let routePrefix = "";

  async function generateVariant(
    sourcePath: string,
    sharpInput: SharpInput,
    sourceHash: string,
    width: number,
  ): Promise<GeneratedVariant> {
    const sourceName = path
      .basename(sourcePath, path.extname(sourcePath))
      .replace(/[^a-z0-9_-]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    const fileName = `${sourceName}-${sourceHash}-${width}.webp`;
    const cachePath = path.join(cacheDirectory, fileName);

    try {
      const contents = await fs.readFile(cachePath);
      return { width, fileName, contents };
    } catch {
      // A missing cache entry is generated below.
    }

    const contents = await limitImageProcessing(async () => {
      let image = sharp(sharpInput, { failOn: "none" }).rotate().resize({
        width,
        fit: "inside",
        withoutEnlargement: true,
      });

      image = image.keepIccProfile();

      image = image.webp({
        quality: 84,
        alphaQuality: 100,
        effort: 4,
        smartSubsample: true,
      });

      const buffer = await image.toBuffer();
      await fs.writeFile(cachePath, buffer);
      return buffer;
    });

    return { width, fileName, contents };
  }

  return {
    name: "responsive-images",
    enforce: "pre",

    configResolved(config) {
      resolvedConfig = config;
      cacheDirectory = path.resolve(
        config.root,
        options.cacheDirectory ?? ".cache/responsive-images",
      );
      routePrefix = `${normalizeBase(config.base)}${RESPONSIVE_IMAGE_ROUTE}/`;
    },

    async buildStart() {
      await fs.mkdir(cacheDirectory, { recursive: true });
    },

    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestPath = request.url?.split("?")[0];
        if (!requestPath?.startsWith(routePrefix)) return next();

        const fileName = path.basename(decodeURIComponent(requestPath.slice(routePrefix.length)));
        const cachePath = path.join(cacheDirectory, fileName);

        try {
          const contents = await fs.readFile(cachePath);
          response.statusCode = 200;
          response.setHeader("Content-Type", getContentType(fileName));
          response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          response.end(contents);
        } catch {
          next();
        }
      });
    },

    async load(id) {
      const sourcePath = parseResponsiveImageId(id);
      if (!sourcePath) return null;

      this.addWatchFile(sourcePath);

      const relativePath = path.relative(resolvedConfig.root, sourcePath).replace(/\\/g, "/");
      const [sharpInput, sourceHash] = await Promise.all([
        getSharpInput(sourcePath),
        hashSourceFile(sourcePath, relativePath),
      ]);
      const metadata = await sharp(sharpInput, { failOn: "none" }).metadata();

      const originalWidth = metadata.autoOrient?.width ?? metadata.width;
      const originalHeight = metadata.autoOrient?.height ?? metadata.height;
      if (!originalWidth || !originalHeight) {
        throw new Error(`Unable to read image dimensions for ${sourcePath}`);
      }

      const outputWidths = getOutputWidths(originalWidth, requestedWidths);

      const generatedVariants = await Promise.all(
        outputWidths.map((width) => generateVariant(sourcePath, sharpInput, sourceHash, width)),
      );

      const emittedSources = generatedVariants.map((variant) => {
        if (resolvedConfig.command === "serve") {
          return JSON.stringify(`${routePrefix}${variant.fileName}`);
        }

        const referenceId = this.emitFile({
          type: "asset",
          name: variant.fileName,
          source: variant.contents,
        });
        return `import.meta.ROLLUP_FILE_URL_${referenceId}`;
      });

      const webpModuleCode = generatedVariants
        .map((variant, index) => `{ src: ${emittedSources[index]}, width: ${variant.width} }`)
        .join(",\n    ");
      const fallbackSource = emittedSources.at(-1);

      return `
export default {
  src: ${fallbackSource},
  width: ${originalWidth},
  height: ${originalHeight},
  webp: [
    ${webpModuleCode}
  ],
}
`;
    },
  };
}
