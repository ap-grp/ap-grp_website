import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'mei-chen',
  name: { en: 'mei chen', zh: '陈梅' },
  position: { en: 'landscape architect', zh: '景观建筑师' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: 'Mei Chen leads landscape design across the practice with a particular interest in tropical planting design and biophilic environments that integrate architecture and nature.',
    zh: '陈梅主导事务所景观设计工作，尤其专注于热带植栽设计以及将建筑与自然融为一体的亲生物环境。',
  },
  qualifications: [
    { en: 'bachelor of landscape architecture, national university of singapore', zh: '景观建筑学学士，新加坡国立大学' },
  ],
  experience: [
    { en: 'eco resort, ubud bali', zh: '生态度假村，巴厘岛乌布' },
    { en: 'wellness township, myanmar', zh: '健康城镇，缅甸' },
    { en: 'the pavilion hotel, chiang mai', zh: '亭阁酒店，清迈' },
  ],
} satisfies Person

export default person
