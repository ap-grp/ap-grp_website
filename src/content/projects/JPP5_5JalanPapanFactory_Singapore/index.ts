import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";

const project = {
  slug: "jpp5-5-jalan-papan-factory-singapore",
  title: { en: "5 jalan papan factory", zh: "5 jalan papan factory" },
  location: { en: "singapore", zh: "新加坡" },
  year: "",
  type: ["industrial"],
  status: "under construction",
  gfa: "7,897.40 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01],
  related: [],
} satisfies Project;

export default project;
