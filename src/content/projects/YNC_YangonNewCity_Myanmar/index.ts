import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";
import gallery03 from "./images/gallery-03.jpg?responsive";
import gallery04 from "./images/gallery-04.jpg?responsive";

const project = {
  slug: "yangon-new-city",
  title: { en: "yangon new city", zh: "仰光新城" },
  location: { en: "yangon, myanmar", zh: "仰光，缅甸" },
  year: "",
  type: ["masterplanning"],
  status: "authority submission",
  gfa: "600,374.22 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04],
  related: [],
} satisfies Project;

export default project;
