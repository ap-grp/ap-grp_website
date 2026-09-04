import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'james-liu',
  name: { en: 'james liu', zh: '刘建明' },
  position: { en: 'associate principal, architecture', zh: '建筑副总监' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: "James Liu leads architectural design across the practice's residential and commercial portfolio. With fifteen years of experience, he brings rigorous technical knowledge and a nuanced design sensibility to complex projects.",
    zh: '刘建明主导事务所住宅与商业项目的建筑设计工作。凭借十五年从业经验，他将严谨的技术知识与细腻的设计感知力带入复杂项目之中。',
  },
  qualifications: [
    { en: 'bachelor of architecture, national university of singapore', zh: '建筑学学士，新加坡国立大学' },
    { en: 'master of architecture, eth zurich', zh: '建筑学硕士，苏黎世联邦理工学院' },
  ],
  experience: [
    { en: 'urban oasis residences, singapore', zh: '城市绿洲住宅，新加坡' },
    { en: 'hilltop cultural centre, hanoi', zh: '山顶文化中心，河内' },
    { en: 'science park offices, singapore', zh: '科学园办公室，新加坡' },
  ],
} satisfies Person

export default person
