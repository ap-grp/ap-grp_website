import type { LocalizedText } from "../types";
import type { ResponsiveImageData } from "../../types/images";

export interface Person {
  slug: string;
  name: LocalizedText;
  position: LocalizedText;
  officeId?: "singapore" | "myanmar" | "indonesia" | "philippines" | "china";
  office?: LocalizedText;
  isPartner: boolean;
  imageUrl?: ResponsiveImageData;
  bio: LocalizedText;
  qualifications: LocalizedText[];
  experience: LocalizedText[];
  awards?: LocalizedText[];
}
