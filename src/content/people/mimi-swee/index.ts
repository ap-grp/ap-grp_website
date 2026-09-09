import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "mimi-swee",
  name: { en: "mimi swee", zh: "mimi swee" },
  position: { en: "production coordinator", zh: "生产协调员" },
  officeId: "myanmar",
  office: { en: "a+pgrp myanmar", zh: "a+pgrp 缅甸" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Mimi Swee is a production coordinator with a+pgrp's Myanmar studio.",
    zh: "Mimi Swee 是 a+pgrp 缅甸工作室的生产协调员。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
