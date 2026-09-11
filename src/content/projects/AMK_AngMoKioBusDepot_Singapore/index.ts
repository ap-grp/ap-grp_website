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
  slug: "ang-mo-kio-bus-depot",
  title: { en: "ang mo kio bus depot", zh: "宏茂桥巴士车厂" },
  location: { en: "singapore", zh: "新加坡" },
  year: "",
  type: ["transport hubs"],
  status: "tender",
  gfa: "84,149.13 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07],
  related: [],
} satisfies Project;

export default project;
