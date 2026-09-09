import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = path.join(root, "docs", "Website_Editing_and_Publishing_Manual.md");
const staging = path.join(root, "docs", ".manual-build", "docx-package");
const logoSource = path.join(root, "docs", ".manual-build", "apgrp-logo.png");

for (const candidate of [sourcePath, staging, logoSource]) {
  const resolved = path.resolve(candidate);
  if (!resolved.startsWith(path.resolve(root) + path.sep)) {
    throw new Error(`Refusing to use a path outside the project workspace: ${resolved}`);
  }
}

const directories = [
  staging,
  path.join(staging, "_rels"),
  path.join(staging, "docProps"),
  path.join(staging, "word"),
  path.join(staging, "word", "_rels"),
  path.join(staging, "word", "media"),
];
directories.forEach((directory) => fs.mkdirSync(directory, { recursive: true }));

const staleThemePath = path.join(staging, "word", "theme", "theme1.xml");
if (fs.existsSync(staleThemePath)) fs.unlinkSync(staleThemePath);

if (!fs.existsSync(logoSource)) {
  await sharp(path.join(root, "src", "assets", "ap-grp_logo.svg"))
    .resize({ width: 700 })
    .png()
    .toFile(logoSource);
}
fs.copyFileSync(logoSource, path.join(staging, "word", "media", "logo.png"));

const logoMetadata = await sharp(logoSource).metadata();
const logoCx = 2857500;
const logoCy = Math.round(logoCx * (logoMetadata.height / logoMetadata.width));
const markdown = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
const blocks = parseMarkdown(markdown);
let nextOrderedNumId = 2;
let currentOrderedNumId;
for (const block of blocks) {
  if (block.type !== "listItem" || !block.ordered) continue;
  if (block.number === 1 || !currentOrderedNumId) {
    currentOrderedNumId = nextOrderedNumId;
    nextOrderedNumId += 1;
  }
  block.numId = currentOrderedNumId;
}
const orderedNumIds = [
  ...new Set(blocks.filter((block) => block.numId).map((block) => block.numId)),
];
const hyperlinks = [];

const bodyXml = [];
let coverMode = true;
let headingOneCount = 0;

bodyXml.push(imageParagraph("rId7", logoCx, logoCy, { before: 1100, after: 1250 }));

for (const block of blocks) {
  if (block.type === "pageBreak") {
    bodyXml.push(pageBreak());
    coverMode = false;
    continue;
  }

  if (block.type === "toc") {
    bodyXml.push(tocField());
    continue;
  }

  if (block.type === "contentsTitle") {
    bodyXml.push(paragraph("Contents", { style: "ContentsTitle", keepNext: true }));
    continue;
  }

  if (block.type === "heading") {
    if (block.level === 1) headingOneCount += 1;
    const style = coverMode ? (block.level === 1 ? "Title" : "Subtitle") : `Heading${block.level}`;
    bodyXml.push(
      paragraph(block.text, {
        style,
        align: coverMode ? "center" : undefined,
        keepNext: true,
      }),
    );
    continue;
  }

  if (block.type === "paragraph") {
    bodyXml.push(paragraph(block.text, { style: coverMode ? "CoverMeta" : "Normal" }));
    continue;
  }

  if (block.type === "quote") {
    bodyXml.push(paragraph(block.text, { style: "Quote", keepTogether: true }));
    continue;
  }

  if (block.type === "code") {
    bodyXml.push(codeParagraph(block.text));
    continue;
  }

  if (block.type === "listItem") {
    const isChecklist = /^\[[ xX]\]\s/.test(block.text);
    const displayText = isChecklist
      ? block.text.replace(/^\[ \]\s*/, "☐ ").replace(/^\[[xX]\]\s*/, "☑ ")
      : block.text;
    bodyXml.push(
      paragraph(displayText, {
        style: isChecklist ? "Checklist" : "Normal",
        numId: isChecklist ? undefined : block.ordered ? block.numId : 1,
      }),
    );
    continue;
  }

  if (block.type === "table") {
    bodyXml.push(tableXml(block.rows));
    continue;
  }

  if (block.type === "rule") bodyXml.push(ruleParagraph());
}

bodyXml.push(sectionProperties());

write("[Content_Types].xml", contentTypes());
write("_rels/.rels", rootRelationships());
write("docProps/core.xml", coreProperties());
write("docProps/app.xml", appProperties());
write("word/document.xml", documentXml(bodyXml.join("\n")));
write("word/styles.xml", stylesXml());
write("word/numbering.xml", numberingXml(orderedNumIds));
write("word/settings.xml", settingsXml());
write("word/fontTable.xml", fontTableXml());
write("word/header1.xml", headerXml());
write("word/footer1.xml", footerXml());
write("word/_rels/document.xml.rels", documentRelationships());

console.log(`STAGING=${staging}`);
console.log(`BLOCKS=${blocks.length}`);
console.log(`HEADINGS=${headingOneCount}`);
console.log(`HYPERLINKS=${hyperlinks.length}`);

function write(relativePath, content) {
  fs.writeFileSync(path.join(staging, ...relativePath.split("/")), content, "utf8");
}

function parseMarkdown(input) {
  const lines = input.split("\n");
  const result = [];
  let paragraphLines = [];
  let inCode = false;
  let codeLines = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    result.push({ type: "paragraph", text: paragraphLines.join(" ") });
    paragraphLines = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (inCode) {
      if (line.startsWith("```")) {
        result.push({ type: "code", text: codeLines.join("\n") });
        inCode = false;
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (line.startsWith("```")) {
      flushParagraph();
      inCode = true;
      continue;
    }

    if (line.trim() === "[[PAGEBREAK]]") {
      flushParagraph();
      result.push({ type: "pageBreak" });
      continue;
    }

    if (line.trim() === "[[TOC]]") {
      flushParagraph();
      result.push({ type: "toc" });
      continue;
    }

    if (line.trim() === "[[CONTENTS_TITLE]]") {
      flushParagraph();
      result.push({ type: "contentsTitle" });
      continue;
    }

    if (
      /^\|.*\|\s*$/.test(line) &&
      index + 1 < lines.length &&
      /^\|?\s*:?-{3,}/.test(lines[index + 1])
    ) {
      flushParagraph();
      const tableLines = [line];
      index += 2;
      while (index < lines.length && /^\|.*\|\s*$/.test(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }
      index -= 1;
      result.push({ type: "table", rows: tableLines.map(splitTableRow) });
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      result.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      result.push({ type: "rule" });
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      const quoteLines = [line.replace(/^>\s?/, "")];
      while (index + 1 < lines.length && /^>\s?/.test(lines[index + 1])) {
        index += 1;
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
      }
      result.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    const unordered = /^-\s+(.*)$/.exec(line);
    const ordered = /^(\d+)\.\s+(.*)$/.exec(line);
    if (unordered || ordered) {
      flushParagraph();
      result.push({
        type: "listItem",
        ordered: Boolean(ordered),
        number: ordered ? Number(ordered[1]) : undefined,
        text: unordered ? unordered[1] : ordered[2],
      });
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    paragraphLines.push(line.trim());
    if (/\s{2}$/.test(line)) flushParagraph();
  }

  if (inCode) result.push({ type: "code", text: codeLines.join("\n") });
  flushParagraph();
  return result;
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function paragraph(text, options = {}) {
  const properties = [];
  if (options.style) properties.push(`<w:pStyle w:val="${xml(options.style)}"/>`);
  if (options.align) properties.push(`<w:jc w:val="${options.align}"/>`);
  if (options.keepNext) properties.push("<w:keepNext/>");
  if (options.keepTogether) properties.push("<w:keepLines/>");
  if (options.numId) {
    properties.push(`<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${options.numId}"/></w:numPr>`);
  }
  return `<w:p><w:pPr>${properties.join("")}</w:pPr>${inlineRuns(text)}</w:p>`;
}

function inlineRuns(text) {
  const parts = [];
  const tokenPattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)]+\)|<https?:\/\/[^>]+>)/g;
  let cursor = 0;
  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > cursor) parts.push(run(text.slice(cursor, match.index)));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(run(token.slice(2, -2), { bold: true }));
    } else if (token.startsWith("`")) {
      parts.push(run(token.slice(1, -1), { code: true }));
    } else {
      const labelled = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(token);
      const url = labelled ? labelled[2] : token.slice(1, -1);
      const label = labelled ? labelled[1] : url;
      const relationshipId = `rId${8 + hyperlinks.length}`;
      hyperlinks.push({ id: relationshipId, url });
      parts.push(
        `<w:hyperlink r:id="${relationshipId}" w:history="1">${run(label, { hyperlink: true })}</w:hyperlink>`,
      );
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) parts.push(run(text.slice(cursor)));
  return parts.join("");
}

function run(text, options = {}) {
  const properties = [];
  if (options.bold) properties.push("<w:b/><w:bCs/>");
  if (options.color) properties.push(`<w:color w:val="${options.color}"/>`);
  if (options.code)
    properties.push(
      '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:color w:val="8A684A"/><w:shd w:val="clear" w:color="auto" w:fill="F5F0EB"/><w:sz w:val="18"/><w:szCs w:val="18"/>',
    );
  if (options.hyperlink) properties.push('<w:rStyle w:val="Hyperlink"/>');
  const propertyXml = properties.length ? `<w:rPr>${properties.join("")}</w:rPr>` : "";
  return `<w:r>${propertyXml}<w:t xml:space="preserve">${xml(text)}</w:t></w:r>`;
}

function codeParagraph(text) {
  const lines = text.split("\n");
  const content = lines
    .map(
      (line, index) =>
        `${run(line || " ", { code: true })}${
          index < lines.length - 1 ? "<w:r><w:br/></w:r>" : ""
        }`,
    )
    .join("");
  return `<w:p><w:pPr><w:pStyle w:val="CodeBlock"/><w:keepLines/></w:pPr>${content}</w:p>`;
}

function tableXml(rows) {
  const columnCount = Math.max(...rows.map((row) => row.length));
  const totalWidth = 9460;
  const cellWidth = Math.floor(totalWidth / columnCount);
  const grid = Array.from({ length: columnCount }, () => `<w:gridCol w:w="${cellWidth}"/>`).join(
    "",
  );
  const rowXml = rows
    .map((row, rowIndex) => {
      const cells = Array.from({ length: columnCount }, (_, columnIndex) => row[columnIndex] || "")
        .map(
          (cell) =>
            `<w:tc><w:tcPr><w:tcW w:w="${cellWidth}" w:type="dxa"/>${
              rowIndex === 0 ? '<w:shd w:val="clear" w:color="auto" w:fill="212529"/>' : ""
            }<w:tcMar><w:top w:w="90" w:type="dxa"/><w:left w:w="110" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:right w:w="110" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:pPr><w:pStyle w:val="TableText"/></w:pPr>${
              rowIndex === 0 ? run(cell, { bold: true, color: "FFFFFF" }) : inlineRuns(cell)
            }</w:p></w:tc>`,
        )
        .join("");
      return `<w:tr><w:trPr><w:cantSplit/>${
        rowIndex === 0 ? "<w:tblHeader/>" : ""
      }</w:trPr>${cells}</w:tr>`;
    })
    .join("");
  return `<w:tbl><w:tblPr><w:tblW w:w="9460" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="single" w:sz="6" w:color="9AA3AC"/><w:left w:val="single" w:sz="6" w:color="9AA3AC"/><w:bottom w:val="single" w:sz="6" w:color="9AA3AC"/><w:right w:val="single" w:sz="6" w:color="9AA3AC"/><w:insideH w:val="single" w:sz="4" w:color="DEE2E6"/><w:insideV w:val="single" w:sz="4" w:color="DEE2E6"/></w:tblBorders><w:tblCellMar><w:top w:w="90" w:type="dxa"/><w:left w:w="110" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:right w:w="110" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${rowXml}</w:tbl><w:p><w:pPr><w:spacing w:after="80"/></w:pPr></w:p>`;
}

function imageParagraph(relationshipId, cx, cy, spacing = {}) {
  return `<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="${spacing.before || 0}" w:after="${spacing.after || 0}"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="1" name="a+pgrp logo" descr="a+pgrp logo"/><wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relationshipId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

function pageBreak() {
  return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
}

function tocField() {
  return '<w:p><w:pPr><w:spacing w:after="160"/></w:pPr><w:r><w:fldChar w:fldCharType="begin" w:dirty="true"/></w:r><w:r><w:instrText xml:space="preserve"> TOC \\o "1-1" \\h \\z \\u </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>Right-click here and choose Update Field to create the contents list.</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>';
}

function ruleParagraph() {
  return '<w:p><w:pPr><w:spacing w:before="120" w:after="180"/></w:pPr></w:p>';
}

function sectionProperties() {
  return `<w:sectPr><w:headerReference w:type="default" r:id="rId5"/><w:footerReference w:type="default" r:id="rId6"/><w:titlePg/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1160" w:right="1247" w:bottom="1160" w:left="1247" w:header="480" w:footer="480" w:gutter="0"/><w:cols w:space="720"/><w:docGrid w:linePitch="360"/></w:sectPr>`;
}

function documentXml(body) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${body}</w:body></w:document>`;
}

function contentTypes() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
}

function rootRelationships() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
}

function documentRelationships() {
  const fixed = [
    [
      "rId1",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
      "styles.xml",
    ],
    [
      "rId2",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",
      "numbering.xml",
    ],
    [
      "rId3",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",
      "settings.xml",
    ],
    [
      "rId4",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",
      "fontTable.xml",
    ],
    [
      "rId5",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",
      "header1.xml",
    ],
    [
      "rId6",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer",
      "footer1.xml",
    ],
    [
      "rId7",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
      "media/logo.png",
    ],
  ];
  const relationships = fixed.map(
    ([id, type, target]) => `<Relationship Id="${id}" Type="${type}" Target="${target}"/>`,
  );
  relationships.push(
    ...hyperlinks.map(
      ({ id, url }) =>
        `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${xmlAttribute(url)}" TargetMode="External"/>`,
    ),
  );
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationships.join("")}</Relationships>`;
}

function stylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos" w:eastAsia="Microsoft YaHei" w:cs="Aptos"/><w:color w:val="212529"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-SG" w:eastAsia="zh-CN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="130" w:line="320" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/><w:pPr><w:widowControl/><w:spacing w:after="130" w:line="320" w:lineRule="auto"/></w:pPr></w:style>
<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/><w:unhideWhenUsed/></w:style>
<w:style w:type="character" w:styleId="Hyperlink"><w:name w:val="Hyperlink"/><w:basedOn w:val="DefaultParagraphFont"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:rPr><w:color w:val="8A684A"/><w:u w:val="single"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Subtitle"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:after="180"/><w:jc w:val="center"/></w:pPr><w:rPr><w:color w:val="212529"/><w:sz w:val="62"/><w:szCs w:val="62"/><w:b/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:next w:val="CoverMeta"/><w:qFormat/><w:pPr><w:spacing w:after="700"/><w:jc w:val="center"/></w:pPr><w:rPr><w:color w:val="B4906E"/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="CoverMeta"><w:name w:val="Cover Meta"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="80"/><w:jc w:val="center"/></w:pPr><w:rPr><w:color w:val="9AA3AC"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="ContentsTitle"><w:name w:val="Contents Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="240" w:after="180"/></w:pPr><w:rPr><w:color w:val="212529"/><w:b/><w:bCs/><w:sz w:val="46"/><w:szCs w:val="46"/></w:rPr></w:style>
${headingStyle(1, 46, "212529", 240, 180, 0)}
${headingStyle(2, 30, "B4906E", 280, 100, 1)}
${headingStyle(3, 23, "212529", 220, 70, 2)}
<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Callout"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:keepLines/><w:spacing w:before="100" w:after="180"/><w:ind w:left="220" w:right="120"/><w:shd w:val="clear" w:color="auto" w:fill="F5F0EB"/><w:pBdr><w:left w:val="single" w:sz="28" w:space="8" w:color="B4906E"/></w:pBdr></w:pPr><w:rPr><w:color w:val="212529"/><w:b/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="CodeBlock"><w:name w:val="Code Block"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="80" w:after="170" w:line="260" w:lineRule="auto"/><w:ind w:left="160" w:right="120"/><w:shd w:val="clear" w:color="auto" w:fill="F8F9FA"/><w:pBdr><w:top w:val="single" w:sz="4" w:color="DEE2E6"/><w:left w:val="single" w:sz="4" w:color="DEE2E6"/><w:bottom w:val="single" w:sz="4" w:color="DEE2E6"/><w:right w:val="single" w:sz="4" w:color="DEE2E6"/></w:pBdr></w:pPr><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="17"/><w:szCs w:val="17"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="TableText"><w:name w:val="Table Text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0" w:line="270" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Checklist"><w:name w:val="Checklist"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="300" w:hanging="0"/><w:spacing w:after="80"/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="Header"><w:name w:val="Header"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/></w:pPr><w:rPr><w:color w:val="9AA3AC"/><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Footer"><w:name w:val="Footer"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/><w:tabs><w:tab w:val="right" w:pos="9460"/></w:tabs></w:pPr><w:rPr><w:color w:val="9AA3AC"/><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:style>
</w:styles>`;
}

function headingStyle(level, size, color, before, after, outlineLevel) {
  return `<w:style w:type="paragraph" w:styleId="Heading${level}"><w:name w:val="heading ${level}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="${8 + level}"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="${before}" w:after="${after}"/><w:outlineLvl w:val="${outlineLevel}"/></w:pPr><w:rPr><w:color w:val="${color}"/><w:b/><w:bCs/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr></w:style>`;
}

function numberingXml(orderedNumIds) {
  const orderedInstances = orderedNumIds
    .map(
      (numId) =>
        `<w:num w:numId="${numId}"><w:abstractNumId w:val="1"/><w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride></w:num>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="520"/></w:tabs><w:ind w:left="520" w:hanging="260"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/></w:rPr></w:lvl></w:abstractNum><w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="right"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="600"/></w:tabs><w:ind w:left="600" w:hanging="300"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>${orderedInstances}</w:numbering>`;
}

function settingsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:zoom w:percent="100"/><w:defaultTabStop w:val="720"/><w:updateFields w:val="true"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>`;
}

function fontTableXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:fonts xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:font w:name="Aptos"><w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font><w:font w:name="Microsoft YaHei"><w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font><w:font w:name="Consolas"><w:family w:val="modern"/><w:pitch w:val="fixed"/></w:font></w:fonts>`;
}

function headerXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pStyle w:val="Header"/></w:pPr>${run("a+pgrp  |  Website Editing Manual")}</w:p></w:hdr>`;
}

function footerXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pStyle w:val="Footer"/></w:pPr>${run("Internal website editing guide")}<w:r><w:tab/></w:r>${run("Page ")}<w:fldSimple w:instr=" PAGE "><w:r><w:rPr><w:color w:val="9AA3AC"/><w:sz w:val="16"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>`;
}

function coreProperties() {
  const date = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>a+pgrp Website Editing Manual</dc:title><dc:subject>Beginner guide to setting up, editing, and locally previewing the a+pgrp website</dc:subject><dc:creator>a+pgrp</dc:creator><cp:keywords>a+pgrp, website, GitHub, Vite, Codex, Claude Code</cp:keywords><dc:description>Detailed non-technical website setup, editing, and local preview instructions.</dc:description><cp:lastModifiedBy>Codex</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${date}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${date}</dcterms:modified></cp:coreProperties>`;
}

function appProperties() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Microsoft Office Word</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><Company>a+pgrp</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>16.0000</AppVersion></Properties>`;
}

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function xmlAttribute(value) {
  return xml(value);
}
