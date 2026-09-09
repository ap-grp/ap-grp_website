import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "wang-qian",
  name: { en: "wang qian", zh: "王谦" },
  position: { en: "director", zh: "董事" },
  officeId: "china",
  office: { en: "a+pgrp china", zh: "a+pgrp 中国" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Wang Qian is a director with a+pgrp's China studio.",
    zh: "王谦是 a+pgrp 中国工作室的董事。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
