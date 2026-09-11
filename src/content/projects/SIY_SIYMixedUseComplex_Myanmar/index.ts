import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";
import gallery03 from "./images/gallery-03.jpg?responsive";
import gallery04 from "./images/gallery-04.jpg?responsive";
import gallery05 from "./images/gallery-05.jpg?responsive";
import gallery06 from "./images/gallery-06.jpg?responsive";
import gallery07 from "./images/gallery-07.jpg?responsive";

const project = {
  slug: "mixed-use-complex",
  title: { en: "siy mixed use complex", zh: "siy mixed use complex" },
  location: { en: "yangon, myanmar", zh: "仰光，缅甸" },
  year: "",
  type: ["retail & mixed-use"],
  status: "design development",
  gfa: "71,256.58 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07],
  related: [],
} satisfies Project;

export default project;
