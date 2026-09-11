import type { Article } from "../types";
import image from "./image.jpg?responsive";

const article = {
  slug: "bali-resort-progress",
  title: "eco resort, bali: design in progress",
  zhTitle: "巴厘岛生态度假村：设计进行中",
  tag: "news",
  date: "22.03.2023",
  summary:
    "a+pgrp shares an update on the eco resort project currently under development in ubud, bali, offering an insight into the design principles and sustainable strategies that are shaping the project.",
  zhSummary:
    "a+pgrp就巴厘岛乌布生态度假村项目的最新进展进行分享，揭示塑造这一项目的设计原则与可持续策略。",
  imageUrl: image,
  body: [
    "a+pgrp's eco resort project in ubud, bali, is currently in the detailed design phase ahead of a planned construction commencement in early 2024.",
    "the project — set within the rice terraces of ubud — adopts a design philosophy of minimal intervention. structures are elevated above the natural ground plane to preserve root systems and drainage patterns, and all materials are sourced locally wherever possible.",
    "the resort will comprise twelve villas, a central dining pavilion, a spa facility, and a series of meditation and yoga platforms integrated into the landscape.",
    '"sustainability is not a strategy in this project — it is the project," said landscape architect mei chen. "every decision, from the position of each structure to the choice of every plant species, is guided by a commitment to protecting and enriching this extraordinary landscape."',
  ],
} satisfies Article;

export default article;
