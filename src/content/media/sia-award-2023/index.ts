import type { Article } from "../types";
import image from "./image.jpg?responsive";

const article = {
  slug: "sia-award-2023",
  title: "a+pgrp receives sia architectural design award 2023",
  zhTitle: "a+pgrp 荣获2023年新加坡建筑师学会建筑设计奖",
  category: "awards",
  zhCategory: "奖项",
  date: "12 november 2023",
  summary:
    "a+pgrp is honoured to receive the singapore institute of architects architectural design award for the urban oasis residences project, recognising excellence in residential architecture.",
  zhSummary:
    "a+pgrp 荣幸地凭借城市绿洲住宅项目荣获新加坡建筑师学会建筑设计奖，彰显在住宅建筑领域的卓越成就。",
  imageUrl: image,
  body: [
    "a+pgrp is proud to announce that the urban oasis residences project has been awarded the singapore institute of architects (sia) architectural design award 2023 in the residential category.",
    "the award recognises projects that demonstrate exceptional design quality and a meaningful contribution to singapore's built environment. the jury commended the project for its sophisticated response to its tropical context and the quality of its residential amenity.",
    '"this recognition means a great deal to the entire team who worked so hard on this project," said founding partner liew soong shoon. "it reflects our belief that architecture must always seek to improve the lives of the people who inhabit it."',
    "the sia architectural design awards are among singapore's most prestigious recognitions of architectural excellence, awarded biennially across residential, commercial, institutional, and urban design categories.",
  ],
} satisfies Article;

export default article;
