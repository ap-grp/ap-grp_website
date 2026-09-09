import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";

const project = {
  slug: "upg-united-paint-group-hq-myanmar",
  title: {
    en: "united paint group headquarters",
    zh: "united paint group headquarters",
  },
  location: { en: "yangon, myanmar", zh: "仰光，缅甸" },
  year: "2019",
  type: ["office"],
  status: "completed",
  gfa: "4540.98 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [],
  images: [cover, gallery01, gallery02],
  related: [],
} satisfies Project;

export default project;
