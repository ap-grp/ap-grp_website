import type { Lang } from "../context/lang";
import type { ResponsiveImageData } from "../types/images";

export type LocalizedText = Record<Lang, string>;

export type ProjectTag =
  | "residential"
  | "retail & mixed-use"
  | "office"
  | "industrial"
  | "hospitality"
  | "institutional"
  | "transport hubs"
  | "masterplanning"
  | "landscape";

export const projectTypeLabels: Record<ProjectTag, LocalizedText> = {
  residential: { en: "residential", zh: "住宅" },
  "retail & mixed-use": { en: "retail & mixed-use", zh: "零售与综合用途" },
  office: { en: "office", zh: "办公" },
  industrial: { en: "industrial", zh: "工业" },
  hospitality: { en: "hospitality", zh: "酒店" },
  institutional: { en: "institutional", zh: "公共建筑" },
  "transport hubs": { en: "transport hubs", zh: "交通枢纽" },
  masterplanning: { en: "masterplanning", zh: "总体规划" },
  landscape: { en: "landscape", zh: "景观" },
};

export const formatProjectTypes = (types: ProjectTag[], lang: Lang) =>
  types.map((type) => projectTypeLabels[type][lang]).join(", ");

export type ProjectStatus =
  | "concept"
  | "proposed"
  | "design development"
  | "authority submission"
  | "tender"
  | "tender awarded"
  | "under construction"
  | "completed";

const projectStatusLabels: Record<ProjectStatus, LocalizedText> = {
  concept: { en: "concept", zh: "概念设计" },
  proposed: { en: "proposed", zh: "提案" },
  "design development": { en: "design development", zh: "设计深化" },
  "authority submission": { en: "authority submission", zh: "政府报审" },
  tender: { en: "tender", zh: "投标" },
  "tender awarded": { en: "tender awarded", zh: "中标" },
  "under construction": { en: "under construction", zh: "施工中" },
  completed: { en: "completed", zh: "已完成" },
};

export const formatProjectStatus = (status: ProjectStatus | "", lang: Lang) =>
  status ? projectStatusLabels[status][lang] : "";

export interface Project {
  slug: string;
  title: LocalizedText;
  location: LocalizedText;
  year: string;
  type: ProjectTag[];
  status: ProjectStatus | "";
  gfa: string;
  estimatedCost: string;
  description: LocalizedText;
  awards: LocalizedText[];
  images: ResponsiveImageData[];
  related: string[];
}
