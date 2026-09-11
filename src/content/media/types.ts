import type { ResponsiveImageData } from "../../types/images";

export const mediaTagLabels = {
  news: { en: "news", zh: "新闻" },
  awards: { en: "awards", zh: "奖项" },
  press: { en: "press", zh: "媒体报道" },
  publications: { en: "publications", zh: "出版物" },
  events: { en: "events", zh: "活动" },
  exhibitions: { en: "exhibitions", zh: "展览" },
  research: { en: "research", zh: "研究" },
} as const;

export type MediaTag = keyof typeof mediaTagLabels;

export const mediaTags = Object.keys(mediaTagLabels) as MediaTag[];

export const isMediaTag = (value: string): value is MediaTag =>
  Object.prototype.hasOwnProperty.call(mediaTagLabels, value);

export interface Article {
  slug: string;
  title: string;
  zhTitle: string;
  tag: MediaTag;
  date: string;
  summary: string;
  zhSummary: string;
  imageUrl: ResponsiveImageData;
  body: string[];
}
