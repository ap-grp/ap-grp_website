import type { Person } from "../types";
import portrait from "./portrait.jpg?responsive";

const person = {
  slug: "christina-tyas-tri-kasih",
  name: { en: "christina tyas tri kasih", zh: "christina tyas tri kasih" },
  position: { en: "architectural designer", zh: "建筑设计师" },
  officeId: "singapore",
  office: { en: "a+pgrp singapore", zh: "a+pgrp 新加坡" },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "Christina Tyas Tri Kasih is an architectural designer with a+pgrp's Singapore studio.",
    zh: "Christina Tyas Tri Kasih 是 a+pgrp 新加坡工作室的建筑设计师。",
  },
  qualifications: [],
  experience: [],
} satisfies Person;

export default person;
