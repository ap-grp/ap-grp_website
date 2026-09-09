import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "randy-andrian-wihardja",
  name: { en: "randy andrian wihardja", zh: "randy andrian wihardja" },
  position: { en: "senior associate", zh: "高级副总监" },
  officeId: "indonesia",
  office: { en: "a+pgrp indonesia", zh: "a+pgrp 印度尼西亚" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Randy Andrian Wihardja is a senior associate with a+pgrp's Indonesia studio.",
    zh: "Randy Andrian Wihardja 是 a+pgrp 印度尼西亚工作室的高级副总监。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
