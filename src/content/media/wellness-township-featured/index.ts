import type { Article } from "../types";
import image from "./image.jpg?responsive";

const article = {
  slug: "wellness-township-featured",
  title: "wellness township masterplan featured in wallpaper magazine",
  zhTitle: "健康城镇总体规划荣登《wallpaper》杂志",
  category: "press",
  zhCategory: "媒体报道",
  date: "18 july 2023",
  summary:
    "wallpaper magazine profiles the wellness township masterplan in myanmar, exploring the planning principles and design philosophy that underpin one of a+pgrp's most ambitious projects to date.",
  zhSummary:
    "《wallpaper》杂志深度报道缅甸健康城镇总体规划，探讨支撑这一迄今最具雄心项目的规划原则与设计理念。",
  imageUrl: image,
  body: [
    "wallpaper magazine's july issue features an in-depth profile of the wellness township masterplan in myanmar, examining the ambitious planning and design principles that guided the project.",
    "the article explores how a+pgrp approached the challenge of creating a new 280-hectare township from the ground up — establishing frameworks for land use, movement, public space, and ecological systems that can support the growth of a genuinely liveable community.",
    "the feature highlights the project's biophilic design strategy, which prioritises pedestrian connectivity, planted corridors, and a network of parks and water features throughout the township.",
    'urban design lead wu dawei spoke to wallpaper about the masterplanning process: "our starting point was always the landscape — understanding the existing ecology, topography, and drainage patterns before introducing any built form."',
  ],
} satisfies Article;

export default article;
