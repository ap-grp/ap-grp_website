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

import type { Project, ProjectTag } from '../types'

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

const RELATED_TYPE_AFFINITIES: Partial<Record<ProjectTag, ProjectTag[]>> = {
  residential: ['retail & mixed-use', 'masterplanning', 'landscape'],
  'retail & mixed-use': ['residential', 'office', 'masterplanning'],
  office: ['retail & mixed-use', 'industrial'],
  industrial: ['office', 'transport hubs'],
  hospitality: ['landscape', 'masterplanning'],
  institutional: ['masterplanning', 'landscape'],
  'transport hubs': ['industrial', 'masterplanning'],
  masterplanning: ['landscape', 'residential', 'retail & mixed-use', 'hospitality', 'institutional'],
  landscape: ['masterplanning', 'hospitality', 'residential', 'institutional'],
}

const projectCountry = (project: Project) => {
  const locationParts = project.location.en.toLowerCase().split(',')
  return locationParts.at(-1)?.trim() ?? ''
}

/**
 * Returns explicit related projects first, then fills any remaining slots with
 * projects ranked by shared type, country, and complementary project types.
 */
export const getRelatedProjects = (project: Project, limit = 2): Project[] => {
  const country = projectCountry(project)
  const complementaryTypes = new Set(
    project.type.flatMap((type) => RELATED_TYPE_AFFINITIES[type] ?? []),
  )

  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate, order) => {
      const explicitIndex = project.related.indexOf(candidate.slug)
      const sharedTypes = candidate.type.filter((type) => project.type.includes(type)).length
      const hasComplementaryType = candidate.type.some((type) => complementaryTypes.has(type))
      const sameCountry = country !== '' && projectCountry(candidate) === country

      const score =
        (explicitIndex >= 0 ? 1_000 - explicitIndex : 0) +
        sharedTypes * 100 +
        (sameCountry ? 25 : 0) +
        (hasComplementaryType ? 10 : 0)

      return { candidate, score, order }
    })
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

// The projects shown on the Home page, in display order.
// Keep this list separate from `projects` so the Home page selection can be
// changed without reordering the main Projects page.
export const latestProjects: Project[] = [
  mmtMtowerMyanmar,
  yangonCentralStation,
  mTerminal,
  minResidences,
]
