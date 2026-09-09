import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "antonius-khierawan",
  name: { en: "antonius khierawan", zh: "antonius khierawan" },
  position: { en: "senior associate", zh: "高级副总监" },
  officeId: "indonesia",
  office: { en: "a+pgrp indonesia", zh: "a+pgrp 印度尼西亚" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Antonius Khierawan is a senior associate with a+pgrp's Indonesia studio.",
    zh: "Antonius Khierawan 是 a+pgrp 印度尼西亚工作室的高级副总监。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
