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
import gallery09 from "./images/gallery-09.jpg?responsive";
import gallery10 from "./images/gallery-10.jpg?responsive";
import gallery11 from "./images/gallery-11.jpg?responsive";

const project = {
  slug: "bhc-bai-hotel-philippines",
  title: { en: "bai hotel", zh: "bai hotel" },
  location: { en: "cebu, philippines", zh: "宿务，菲律宾" },
  year: "",
  type: ["hospitality"],
  status: "completed",
  gfa: "49,381.00 sqm",
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
    gallery09,
    gallery10,
    gallery11,
  ],
  related: [],
} satisfies Project;

export default project;
