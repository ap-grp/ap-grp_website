import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";
import gallery03 from "./images/gallery-03.jpg?responsive";
import gallery04 from "./images/gallery-04.jpg?responsive";
import gallery05 from "./images/gallery-05.jpg?responsive";
import gallery06 from "./images/gallery-06.jpg?responsive";
import gallery07 from "./images/gallery-07.jpg?responsive";
import gallery08 from "./images/gallery-08.jpg?responsive";

const project = {
  slug: "jmu-meikarta-university-indonesia",
  title: { en: "meikarta university", zh: "meikarta university" },
  location: { en: "jakarta, indonesia", zh: "雅加达，印度尼西亚" },
  year: "",
  type: ["institutional", "masterplanning"],
  status: "proposed",
  gfa: "39,535.00 Sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [
    cover,
    gallery01,
    gallery02,
    gallery03,
    gallery04,
    gallery05,
    gallery06,
    gallery07,
    gallery08,
  ],
  related: [],
} satisfies Project;

export default project;
