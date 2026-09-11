import type { Article } from "../types";
import image from "./image.jpg?responsive";

const article = {
  slug: "insights-tropical-architecture",
  title: "designing for the tropics: principles from twenty years of practice",
  zhTitle: "为热带而设计：二十年实践的原则",
  tag: "publications",
  date: "10.01.2023",
  summary:
    "founding partner liew soong shoon reflects on the defining principles that have guided a+pgrp's approach to tropical architecture across two decades of practice in southeast asia.",
  zhSummary: "创始合伙人廖松顺回顾引导a+pgrp二十年东南亚热带建筑实践的核心原则。",
  imageUrl: image,
  body: [
    "writing for the singapore institute of architects journal, founding partner liew soong shoon shares the defining principles that have guided a+pgrp's approach to architecture in the tropics over twenty years of practice.",
    "the article explores how climate, culture, and the particular quality of tropical light have shaped the practice's design language — from the disposition of buildings on their sites to the design of shading systems, natural ventilation, and landscape integration.",
    '"in the tropics, the boundary between inside and outside is always negotiable," liew writes. "the most interesting architecture in this region is that which takes this ambiguity seriously, designing threshold spaces that mediate between the interior and the exterior world."',
    "the article also examines how the practice's approach has evolved in response to climate change, noting an increasing emphasis on passive design strategies, resilient landscape design, and adaptive building forms.",
  ],
} satisfies Article;

export default article;
