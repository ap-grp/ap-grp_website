import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'sarah-tan',
  name: { en: 'sarah tan', zh: '陈诗慧' },
  position: { en: 'associate principal, interior design', zh: '室内设计副总监' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: 'Sarah Tan leads interior design projects with a focus on hospitality and high-end residential. Her sensitivity to material and detail creates spaces that are refined, restful, and deeply considered.',
    zh: '陈诗慧主导酒店与高端住宅室内设计项目。她对材料与细节的敏锐感知，塑造出精致、舒适且经过深思熟虑的空间。',
  },
  qualifications: [
    { en: 'bachelor of interior design, lasalle college of the arts', zh: '室内设计学士，新加坡拉萨尔艺术学院' },
    { en: 'member, institute of interior designers singapore', zh: '新加坡室内设计师学会会员' },
  ],
  experience: [
    { en: 'the pavilion hotel, chiang mai', zh: '亭阁酒店，清迈' },
    { en: 'eco resort, ubud bali', zh: '生态度假村，巴厘岛乌布' },
    { en: 'science park offices, singapore', zh: '科学园办公室，新加坡' },
  ],
} satisfies Person

export default person
