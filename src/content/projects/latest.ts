import mTerminal from "./MCY_MTerminal_Myanmar";
import mmtMtowerMyanmar from "./MMT_MTower_Myanmar";
import minResidences from "./MRY_MinResidences_Myanmar";
import yangonCentralStation from "./YCS_YangonCentralStation_Myanmar";
import type { Project } from "../types";

// The projects shown on the Home page, in display order.
export const latestProjects: Project[] = [
  mmtMtowerMyanmar,
  yangonCentralStation,
  mTerminal,
  minResidences,
];
