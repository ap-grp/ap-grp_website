import type { Person } from "../types";

const person = {
  slug: "mark-r",
  name: { en: "mark r.", zh: "mark r." },
  position: { en: "technical assistant", zh: "技术助理" },
  officeId: "philippines",
  office: { en: "a+pgrp philippines", zh: "a+pgrp 菲律宾" },
  isPartner: false,
  bio: {
    en: "Mark R. is a technical assistant with a+pgrp's Philippines studio.",
    zh: "Mark R. 是 a+pgrp 菲律宾工作室的技术助理。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
