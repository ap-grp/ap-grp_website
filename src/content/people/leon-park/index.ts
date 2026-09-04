import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'leon-park',
  name: { en: 'leon park', zh: '朴俊赫' },
  position: { en: 'project architect', zh: '项目建筑师' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: 'Leon Park is a skilled project architect with a particular strength in construction documentation and contract administration. He brings precision and care to every project he manages.',
    zh: '朴俊赫是一位出色的项目建筑师，尤其擅长施工文件编制与合同管理，为每个经手的项目带来精准与细致。',
  },
  qualifications: [
    { en: 'bachelor of architecture, korea university', zh: '建筑学学士，韩国高丽大学' },
    { en: 'registered architect, singapore', zh: '新加坡注册建筑师' },
  ],
  experience: [
    { en: 'urban oasis residences, singapore', zh: '城市绿洲住宅，新加坡' },
    { en: 'science park offices, singapore', zh: '科学园办公室，新加坡' },
  ],
} satisfies Person

export default person
