import architectureImage from './images/architecture.jpg'
import interiorDesignImage from './images/interior-design.jpg'
import landscapeDesignImage from './images/landscape-design.jpg'
import masterplanningImage from './images/masterplanning.jpg'
import projectManagementImage from './images/project-management.jpg'
import tourismDevelopmentImage from './images/tourism-development.jpg'
import urbanPlanningImage from './images/urban-planning.jpg'

import type { LocalizedText, ProjectTag } from '../types'

export interface Service {
  id: string
  number: string
  name: LocalizedText
  description: LocalizedText
  imageUrl: string
  relatedCategory: ProjectTag | 'all'
}

export const services: Service[] = [
  {
    id: 'architecture',
    number: '01',
    name: { en: 'architecture', zh: '建筑设计' },
    description: {
      en: 'we create buildings that respond thoughtfully to their context — cultural, climatic, and social. from concept through to completion, our architecture is guided by a conviction that form and function must be inseparable.',
      zh: '我们创造的建筑对其文化、气候与社会背景作出深思熟虑的回应。从概念到落成，我们的建筑设计始终坚信形式与功能不可分割。',
    },
    imageUrl: architectureImage,
    relatedCategory: 'all',
  },
  {
    id: 'project-management',
    number: '02',
    name: { en: 'project management', zh: '项目管理' },
    description: {
      en: 'our project management services ensure that design intent is realised with precision. we manage complex, multi-stakeholder projects across all phases, delivering quality outcomes on time and within budget.',
      zh: '我们的项目管理服务确保设计意图得到精准实现。我们跨越所有阶段管理复杂的多方利益相关者项目，按时按预算交付优质成果。',
    },
    imageUrl: projectManagementImage,
    relatedCategory: 'all',
  },
  {
    id: 'interior-design',
    number: '03',
    name: { en: 'interior design', zh: '室内设计' },
    description: {
      en: 'from intimate hospitality environments to corporate workplaces, our interior design is rooted in a deep understanding of how people occupy space. we create interiors that are refined, purposeful, and enduring.',
      zh: '从亲密的酒店环境到企业办公空间，我们的室内设计植根于对人如何使用空间的深刻理解。我们创造精致、有目的性且历久弥新的室内环境。',
    },
    imageUrl: interiorDesignImage,
    relatedCategory: 'retail & mixed-use',
  },
  {
    id: 'landscape-design',
    number: '04',
    name: { en: 'landscape design', zh: '景观设计' },
    description: {
      en: 'we design landscapes that extend the architecture into the ground — creating ecologies, circulation systems, and sensory experiences that connect people to the natural world, even within the densest urban settings.',
      zh: '我们设计的景观将建筑延伸至大地——创造生态系统、动线与感官体验，使人们与自然世界相连，即便在最密集的城市环境中。',
    },
    imageUrl: landscapeDesignImage,
    relatedCategory: 'landscape',
  },
  {
    id: 'urban-planning',
    number: '05',
    name: { en: 'urban planning', zh: '城市规划' },
    description: {
      en: 'our urban planning practice engages with the complexity of cities — their movement systems, land uses, social infrastructures, and economic forces. we develop plans that are robust, flexible, and deeply humane.',
      zh: '我们的城市规划实践面对城市的复杂性——其交通系统、土地利用、社会基础设施与经济力量。我们制定的规划具有稳健性、灵活性与深厚的人文关怀。',
    },
    imageUrl: urbanPlanningImage,
    relatedCategory: 'masterplanning',
  },
  {
    id: 'master-planning',
    number: '06',
    name: { en: 'masterplanning', zh: '总体规划' },
    description: {
      en: 'from new townships to urban precincts, our masterplans establish the spatial, social, and ecological frameworks that allow great places to grow over time. we plan for the long term, with clarity and ambition.',
      zh: '从新城镇到城市片区，我们的总体规划建立空间、社会与生态框架，使优质场所随时间生长。我们着眼长远，以清晰的愿景和雄心规划未来。',
    },
    imageUrl: masterplanningImage,
    relatedCategory: 'masterplanning',
  },
  {
    id: 'tourism-development',
    number: '07',
    name: { en: 'tourism development', zh: '旅游开发' },
    description: {
      en: 'we bring a holistic approach to tourism development, considering architecture, landscape, programming, and operations together. our tourism projects create authentic experiences that are rooted in place and culture.',
      zh: '我们以整体视角开展旅游开发，将建筑、景观、规划与运营统筹考量。我们的旅游项目创造植根于地方与文化的真实体验。',
    },
    imageUrl: tourismDevelopmentImage,
    relatedCategory: 'hospitality',
  },
]
