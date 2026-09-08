import mmtMtowerMyanmar from './MMT_MTower_Myanmar'
import yangonCentralStation from './YCS_YangonCentralStation_Myanmar'
import mTerminal from './MCY_MTerminal_Myanmar'
import minResidences from './MRY_MinResidences_Myanmar'
import baiHotel from './BHC_BaiHotel_Philippines'
import defuIndustrialCity from './DIC_DefuIndustrialCity_Singapore'
import meikartaUniversity from './JMU_MeikartaUniversity_Indonesia'
import siyMixedUseComplex from './SIY_SIYMixedUseComplex_Myanmar'
import dagonSeikanTownship from './PSL_DagonSeikanTownship_Myanmar'
import nanchangUniversityHospital from './NCU_NanchangUniversityHospital_China'
import andersenGarden from './BAG_AndersenGarden_China'
import lot8Residences from './L8R_Lot8Residences_Philippines'
import camotesIntegratedResort from './CIR_CamotesIntegratedResort_Philippines'
import panPacificHotelUpgrading from './PPH_PanPacificHotelUpgrading_Singapore'
import rambuganDiscoveryResort from './RBR_RambuganDiscoveryResort_Malaysia'
import unitedPaintGroupHeadquarters from './UPG_UnitedPaintGroupHQ_Myanmar'
import hgMetalManufacturing from './JBH_HGMetalManufacturing_Singapore'
import ngapaliInternationalAirport from './NIA_NgapaliInternationalAirport_Myanmar'
import jalanPapanFactory9 from './JPP9_9JalanPapanFactory_Singapore'
import jalanPapanFactory5 from './JPP5_5JalanPapanFactory_Singapore'
import angMoKioBusDepot from './AMK_AngMoKioBusDepot_Singapore'
import hehoWellnessTownship from './KHH_HehoWellnessTownship_Myanmar'
import stEngineeringAerospaceHangar from './STE_STEngineeringAerospaceHangar_Singapore'
import terusanEdgeDormitory from './TED_TerusanEdgeDormitory_Singapore'
import yangonNewCity from './YNC_YangonNewCity_Myanmar'
import lorongHalusBusDepot from './LHB_LorongHalusBusDepot_Singapore'
import yangonSmartMall from './YSM_YangonSmartMall_Myanmar'

import type { Project } from '../types'

export type { Project, ProjectStatus, ProjectTag } from '../types'

export const projects: Project[] = [
  mmtMtowerMyanmar,
  yangonCentralStation,
  mTerminal,
  minResidences,
  baiHotel,
  defuIndustrialCity,
  meikartaUniversity,
  siyMixedUseComplex,
  dagonSeikanTownship,
  nanchangUniversityHospital,
  andersenGarden,
  lot8Residences,
  camotesIntegratedResort,
  panPacificHotelUpgrading,
  rambuganDiscoveryResort,
  unitedPaintGroupHeadquarters,
  hgMetalManufacturing,
  ngapaliInternationalAirport,
  jalanPapanFactory9,
  jalanPapanFactory5,
  angMoKioBusDepot,
  hehoWellnessTownship,
  stEngineeringAerospaceHangar,
  terusanEdgeDormitory,
  yangonNewCity,
  lorongHalusBusDepot,
  yangonSmartMall,
]

// The projects shown on the Home page, in display order.
// Keep this list separate from `projects` so the Home page selection can be
// changed without reordering the main Projects page.
export const latestProjects: Project[] = [
  mmtMtowerMyanmar,
  yangonCentralStation,
  mTerminal,
  minResidences,
]
