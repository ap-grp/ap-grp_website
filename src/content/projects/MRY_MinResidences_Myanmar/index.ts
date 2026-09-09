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

const project = {
  slug: "mry-min-residences-myanmar",
  title: { en: "min residences", zh: "min residences" },
  location: { en: "yangon, myanmar", zh: "仰光，缅甸" },
  year: "",
  type: ["residential"],
  status: "under construction",
  gfa: "92,559.47 sqm",
  estimatedCost: "96,500,000 usd",
  description: { en: "", zh: "" },
  awards: [
    {
      en: "best condo design asia property awards 2018",
      zh: "2018 亚洲地产大奖 最佳公寓设计",
    },
    {
      en: "best mixed use development asia property awards 2018",
      zh: "2018 亚洲地产大奖 最佳综合开发",
    },
    {
      en: "best condo design asia property awards 2018",
      zh: "2018 亚洲地产大奖 最佳公寓设计",
    },
    {
      en: "best universal design asia property awards 2018",
      zh: "2018 亚洲地产大奖 最佳通用设计",
    },
  ],
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
  ],
  related: [],
} satisfies Project;

export default project;
