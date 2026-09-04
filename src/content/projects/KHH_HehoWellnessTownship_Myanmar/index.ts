import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'
import gallery05 from './images/gallery-05.jpg'

const project = {
  slug: 'khh-heho-wellness-township-myanmar',
  title: { en: 'heho wellness township', zh: 'heho wellness township' },
  location: { en: 'heho, myanmar', zh: '黑霍，缅甸' },
  year: '',
  type: ['masterplanning'],
  status: 'design development',
  gfa: '',
  estimatedCost: '',
  description: { en: 'located on a 350-acre site in heho, myanmar, the masterplan proposes a new town centred around a golf resort and wellness destination. the development brings together residential, commercial, hospitality and recreational uses within a structured framework of roads, open spaces and landscape corridors. \n' + 
    'the 18-hole championship golf course forms the defining feature of the development, shaping the surrounding neighbourhoods and establishing a distinct identity for the town. a dedicated wellness and recreational park, complemented by a large water feature, provides additional opportunities for leisure and community activities, while commercial and hospitality areas support both residents and visitors. \n' +
    'the masterplan is designed as a flexible framework for long-term growth, balancing development with generous green spaces and creating a cohesive environment for living, working and recreation.', 
    zh: '项目位于缅甸黑霍，占地约350英亩，规划以高尔夫度假村及康养 destinations为核心，打造一座全新的城镇。整体规划将住宅、商业、酒店及休闲娱乐功能融入由道路、开放空间及景观廊道构成的整体框架之中。\n' +
    '18洞锦标赛级高尔夫球场作为整个开发项目的核心特色，塑造周边社区的空间布局，并为城镇建立鲜明的整体形象。专属的康养及休闲公园结合大型水景，为居民及游客提供多元化的休闲与社区活动空间；商业及酒店区域则进一步满足居民与访客的日常生活、消费及住宿需求。\n' +
    '总体规划以灵活的长期发展框架为基础，在开发建设与充足的绿色空间之间取得平衡，并营造一个融合居住、工作及休闲活动的整体环境。' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05],
  related: [],
} satisfies Project

export default project
