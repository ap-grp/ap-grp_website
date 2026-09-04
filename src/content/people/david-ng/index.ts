import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'david-ng',
  name: { en: 'david ng', zh: '吴大伟' },
  position: { en: 'urban design lead', zh: '城市设计总监' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "David Ng leads the practice's urban planning and masterplanning portfolio. With expertise spanning urban design policy, transportation planning, and public realm design, he brings a holistic perspective to large-scale commissions.",
    zh: '吴大伟主导事务所的城市规划与总体规划业务。凭借横跨城市设计政策、交通规划与公共空间设计的专业积累，他为大型项目提供全局视角。',
  },
  qualifications: [
    { en: 'bachelor of urban planning, national university of singapore', zh: '城市规划学士，新加坡国立大学' },
    { en: 'master of urban design, harvard graduate school of design', zh: '城市设计硕士，哈佛大学设计研究生院' },
  ],
  experience: [
    { en: 'marina bay precinct, singapore', zh: '滨海湾片区，新加坡' },
    { en: 'wellness township, myanmar', zh: '健康城镇，缅甸' },
    { en: 'riverside masterplan, kuala lumpur', zh: '河滨总体规划，吉隆坡' },
  ],
} satisfies Person

export default person
