import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";

const project = {
  slug: "jpp9-9-jalan-papan-factory-singapore",
  title: { en: "9 jalan papan factory", zh: "9 jalan papan factory" },
  location: { en: "singapore", zh: "新加坡" },
  year: "",
  type: ["industrial"],
  status: "completed",
  gfa: "13,932.75 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01],
  related: [],
} satisfies Project;

export default project;
