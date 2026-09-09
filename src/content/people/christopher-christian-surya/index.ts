import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "christopher-christian-surya",
  name: {
    en: "christopher christian surya",
    zh: "christopher christian surya",
  },
  position: { en: "architectural designer", zh: "建筑设计师" },
  officeId: "singapore",
  office: { en: "a+pgrp singapore", zh: "a+pgrp 新加坡" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Christopher Christian Surya is an architectural designer with a+pgrp's Singapore studio.",
    zh: "Christopher Christian Surya 是 a+pgrp 新加坡工作室的建筑设计师。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
