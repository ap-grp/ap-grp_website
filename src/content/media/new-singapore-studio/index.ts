import type { Article } from "../types";
import image from "./image.jpg?responsive";

const article = {
  slug: "new-singapore-studio",
  title: "a+pgrp marks twenty years with expanded singapore studio",
  zhTitle: "a+pgrp 以扩建新加坡工作室庆祝二十周年",
  category: "news",
  zhCategory: "新闻",
  date: "5 may 2023",
  summary:
    "marking two decades of practice, a+pgrp has expanded its singapore studio at science park, creating a new collaborative workspace designed to support the next phase of the practice's growth.",
  zhSummary:
    "值二十周年之际，a+pgrp扩建了位于科学园的新加坡工作室，打造全新协作空间，为事务所下一阶段的发展奠定基础。",
  imageUrl: image,
  body: [
    "a+pgrp has expanded its singapore studio at science park 2 to mark the practice's twentieth anniversary. the new space, designed in-house by the practice's interior design team, creates a collaborative working environment that reflects the values and culture of the firm.",
    "the studio occupies an expanded floor area of 450 square metres, featuring open-plan studio space, dedicated model-making facilities, a project library, and a new client presentation suite.",
    '"the studio is our home and the place where our best work begins," said founding partner liew soong shoon. "designing it ourselves gave us an opportunity to demonstrate what we believe about how creative teams should work together."',
    "the new studio opened to the team in april 2023 and serves as the base for all singapore-based projects across architecture, interior design, landscape, and urban planning.",
  ],
} satisfies Article;

export default article;
