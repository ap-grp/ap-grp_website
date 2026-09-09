import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";
import gallery03 from "./images/gallery-03.jpg?responsive";
import gallery04 from "./images/gallery-04.jpg?responsive";
import gallery05 from "./images/gallery-05.jpg?responsive";

const project = {
  slug: "l8r-lot-8-residences-philippines",
  title: { en: "lot 8 residences", zh: "lot 8 residences" },
  location: { en: "cebu, philippines", zh: "宿务，菲律宾" },
  year: "",
  type: ["residential"],
  status: "completed",
  gfa: "25,421 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05],
  related: [],
} satisfies Project;

export default project;
