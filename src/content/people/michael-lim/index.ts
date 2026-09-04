import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'michael-lim',
  name: { en: 'michael lim', zh: '林明轩' },
  position: { en: 'senior architect', zh: '高级建筑师' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: 'Michael Lim brings a strong design voice and technical rigour to every project he leads. He is particularly skilled in complex mixed-use and civic commissions.',
    zh: '林明轩为每个主导项目带来鲜明的设计主张与严谨的技术素养，尤其擅长复杂综合体与公共建筑项目。',
  },
  qualifications: [
    { en: 'bachelor of architecture, university of melbourne', zh: '建筑学学士，墨尔本大学' },
    { en: 'registered architect, singapore', zh: '新加坡注册建筑师' },
  ],
  experience: [
    { en: 'hilltop cultural centre, hanoi', zh: '山顶文化中心，河内' },
    { en: 'marina bay precinct, singapore', zh: '滨海湾片区，新加坡' },
  ],
} satisfies Person

export default person
