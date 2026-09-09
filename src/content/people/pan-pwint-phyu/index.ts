import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "pan-pwint-phyu",
  name: { en: "pan pwint phyu", zh: "pan pwint phyu" },
  position: { en: "architectural assistant", zh: "建筑助理" },
  officeId: "singapore",
  office: { en: "a+pgrp singapore", zh: "a+pgrp 新加坡" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Pan Pwint Phyu is an architectural assistant with a+pgrp's Singapore studio.",
    zh: "Pan Pwint Phyu 是 a+pgrp 新加坡工作室的建筑助理。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
