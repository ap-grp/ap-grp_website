import type { Person } from '../types'
import portrait from './portrait.png'

const person = {
  slug: 'mei-mei-leong',
  name: { en: 'mei mei leong', zh: '梁美美' },
  position: { en: 'partner', zh: '合伙人' },
  isPartner: true,
  imageUrl: portrait,
  bio: {
    en: "Mei Mei Leong brings exceptional depth in interior design and spatial planning to the practice. Her design philosophy centres on the relationship between people and place, believing that interiors must support human wellbeing as much as they delight the eye.",
    zh: '梁美美为事务所带来深厚的室内设计与空间规划专业积累。她的设计哲学以人与场所的关系为核心，深信室内空间在悦目之余，更须支持人的身心健康。',
  },
  qualifications: [
    { en: 'bachelor of interior design (honours), lasalle college of the arts', zh: '室内设计荣誉学士，新加坡拉萨尔艺术学院' },
    { en: 'master of interior architecture, royal college of art, london', zh: '室内建筑学硕士，英国皇家艺术学院' },
    { en: 'registered interior designer, singapore', zh: '新加坡注册室内设计师' },
    { en: 'fellow, institute of interior designers singapore', zh: '新加坡室内设计师学会院士' },
  ],
  experience: [
    { en: 'the pavilion hotel, chiang mai', zh: '亭阁酒店，清迈' },
    { en: 'science park offices, singapore', zh: '科学园办公室，新加坡' },
    { en: 'eco resort, ubud bali', zh: '生态度假村，巴厘岛乌布' },
    { en: 'urban oasis residences, singapore', zh: '城市绿洲住宅，新加坡' },
  ],
  awards: [
    { en: 'id+a asia interior design award 2023', zh: 'ID+A亚洲室内设计奖 2023' },
    { en: 'singapore interior design awards, best hospitality 2022', zh: '新加坡室内设计奖 最佳酒店项目 2022' },
    { en: 'frame awards, merit 2020', zh: 'Frame Awards 优秀奖 2020' },
  ],
} satisfies Person

export default person
