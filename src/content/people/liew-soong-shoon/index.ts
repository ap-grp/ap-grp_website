import type { Person } from '../types'
import portrait from './portrait.jpg'

const person = {
  slug: 'liew-soong-shoon',
  name: { en: 'liew soong shoon', zh: '廖松顺' },
  position: { en: 'founding partner', zh: '创始合伙人' },
  isPartner: true,
  imageUrl: portrait,
  bio: {
    en: "Liew Soong Shoon co-founded a+pgrp in 2004 following distinguished careers at leading international architecture practices in Singapore and London. His work is defined by a commitment to place-making and a conviction that architecture must respond with sensitivity to its cultural, climatic, and social context.",
    zh: '廖松顺于2004年联合创立a+pgrp，此前曾在新加坡和伦敦多家知名国际建筑事务所任职。他的作品以对场所营造的执着追求以及建筑应敏感回应文化、气候与社会背景的坚定信念为核心。',
  },
  qualifications: [
    { en: 'bachelor of architecture (honours), national university of singapore', zh: '建筑学荣誉学士，新加坡国立大学' },
    { en: 'master of architecture, architectural association london', zh: '建筑学硕士，英国建筑联盟学院' },
    { en: 'registered architect, singapore', zh: '新加坡注册建筑师' },
    { en: 'member, singapore institute of architects', zh: '新加坡建筑师学会会员' },
  ],
  experience: [
    { en: 'wellness township, myanmar', zh: '健康城镇，缅甸' },
    { en: 'urban oasis residences, singapore', zh: '城市绿洲住宅，新加坡' },
    { en: 'the pavilion hotel, chiang mai', zh: '亭阁酒店，清迈' },
    { en: 'marina bay precinct, singapore', zh: '滨海湾片区，新加坡' },
    { en: 'riverside masterplan, kuala lumpur', zh: '河滨总体规划，吉隆坡' },
  ],
  awards: [
    { en: 'sia architectural design award 2022', zh: '新加坡建筑师学会建筑设计奖 2022' },
    { en: "fiabci prix d'excellence, merit award 2021", zh: '国际房地产联合会卓越奖 优秀奖 2021' },
    { en: 'aia singapore design award 2019', zh: '美国建筑师学会新加坡设计奖 2019' },
  ],
} satisfies Person

export default person
