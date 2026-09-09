import type { ResponsiveImageData } from "../../types/images";

export interface Article {
  slug: string;
  title: string;
  zhTitle: string;
  category: string;
  zhCategory: string;
  date: string;
  summary: string;
  zhSummary: string;
  imageUrl: ResponsiveImageData;
  body: string[];
}
