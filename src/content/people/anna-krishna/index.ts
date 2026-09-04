import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'anna-krishna',
  name: { en: 'anna krishna', zh: '安娜·克里希纳' },
  position: { en: 'interior designer', zh: '室内设计师' },
  isPartner: false,
  imageUrl: portrait,
  bio: {
    en: 'Anna Krishna brings a fresh perspective and genuine enthusiasm to interior design projects. Her work is characterised by thoughtful material selections and a sensitivity to the way people inhabit spaces.',
    zh: '安娜·克里希纳为室内设计项目带来清新视角与真诚热忱。她的作品以审慎的材料选择和对人如何栖居空间的敏感洞察为特色。',
  },
  qualifications: [
    { en: 'bachelor of interior design, lasalle college of the arts', zh: '室内设计学士，新加坡拉萨尔艺术学院' },
  ],
  experience: [
    { en: 'the pavilion hotel, chiang mai', zh: '亭阁酒店，清迈' },
    { en: 'science park offices, singapore', zh: '科学园办公室，新加坡' },
  ],
} satisfies Person

export default person
