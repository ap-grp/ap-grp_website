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
import gallery12 from "./images/gallery-12.jpg?responsive";

const project = {
  slug: "m-tower",
  title: { en: "m tower", zh: "m 塔" },
  location: { en: "yangon, myanmar", zh: "仰光，缅甸" },
  year: "2023",
  type: ["office"],
  status: "completed",
  gfa: "63,755.97 sqm",
  estimatedCost: "60,000,000 usd",
  description: {
    en: "m tower is a 26-storey grade a office building in yangon, offering modern, flexible office spaces with high-quality finishes, raised floors, and sustainable features. strategically located near hledan junction, it serves international firms and mottama holdings’ headquarters.",
    zh: "m tower 是一座位于仰光的 26 层甲级办公楼，提供现代化、灵活的办公空间，配备高品质装修、架高地板系统及多项可持续发展设施。大厦毗邻 hledan junction（赫莱丹交通枢纽），地理位置优越，是众多国际企业及 mottama holdings 总部的所在地。",
  },
  awards: [
    {
      en: "best office design, asia property awards 2018",
      zh: "2018 亚洲地产大奖最佳办公楼设计",
    },
    {
      en: "best universal design, asia property awards 2018",
      zh: "2018 亚洲地产大奖最佳通用设计",
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
    gallery10,
    gallery11,
    gallery12,
  ],
  related: ["the-pavilion-hotel", "wellness-township"],
} satisfies Project;

export default project;
