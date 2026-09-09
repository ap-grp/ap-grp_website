import type { Person } from "../types";

const person = {
  slug: "nemencio-t",
  name: { en: "nemencio t.", zh: "nemencio t." },
  position: { en: "technical assistant", zh: "技术助理" },
  officeId: "philippines",
  office: { en: "a+pgrp philippines", zh: "a+pgrp 菲律宾" },
  isPartner: false,
  bio: {
    en: "Nemencio T. is a technical assistant with a+pgrp's Philippines studio.",
    zh: "Nemencio T. 是 a+pgrp 菲律宾工作室的技术助理。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
