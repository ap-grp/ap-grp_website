import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";
import gallery03 from "./images/gallery-03.jpg?responsive";
import gallery04 from "./images/gallery-04.jpg?responsive";

const project = {
  slug: "rbr-rambugan-discovery-resort-malaysia",
  title: { en: "rambugan discovery resort", zh: "rambugan discovery resort" },
  location: { en: "sarawak, malaysia", zh: "砂拉越，马来西亚" },
  year: "",
  type: ["hospitality"],
  status: "proposed",
  gfa: "",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04],
  related: [],
} satisfies Project;

export default project;
