import type { Project } from "../../types";

import cover from "./images/cover.jpg?responsive";
import gallery01 from "./images/gallery-01.jpg?responsive";
import gallery02 from "./images/gallery-02.jpg?responsive";
import gallery03 from "./images/gallery-03.jpg?responsive";
import gallery04 from "./images/gallery-04.jpg?responsive";
import gallery05 from "./images/gallery-05.jpg?responsive";

const project = {
  slug: "mcy-m-terminal-myanmar",
  title: { en: "terminal m mall", zh: "terminal m 购物中心" },
  location: { en: "yangon, myanmar", zh: "仰光，缅甸" },
  year: "2022",
  type: ["retail & mixed-use"],
  status: "completed",
  gfa: "63,755.97 sqm",
  estimatedCost: "",
  description: { en: "", zh: "" },
  awards: [
    {
      en: "asia property awards 2018 - best retail development",
      zh: "2018 年亚洲地产奖 - 最佳零售开发项目",
    },
  ],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05],
  related: [],
} satisfies Project;

export default project;
