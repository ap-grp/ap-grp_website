import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'rachel-wong',
  name: { en: 'rachel wong', zh: '王瑞琪' },
  position: { en: 'senior interior designer', zh: '高级室内设计师' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: 'Rachel Wong specialises in luxury residential and boutique hospitality interiors. Her work is characterised by a restrained palette and exceptional attention to craftsmanship and detail.',
    zh: '王瑞琪专注于豪华住宅与精品酒店室内设计。她的作品以克制的色调和对工艺与细节的极致关注为特色。',
  },
  qualifications: [
    { en: 'bachelor of interior architecture (honours), rmit university', zh: '室内建筑学荣誉学士，澳大利亚皇家墨尔本理工大学' },
  ],
  experience: [
    { en: 'eco resort, ubud bali', zh: '生态度假村，巴厘岛乌布' },
    { en: 'urban oasis residences, singapore', zh: '城市绿洲住宅，新加坡' },
  ],
} satisfies Person

export default person
