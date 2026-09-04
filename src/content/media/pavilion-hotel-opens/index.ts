import type { Article } from '../types'
import image from './image.jpg'

const article = {
  slug: 'pavilion-hotel-opens',
  title: 'the pavilion hotel, chiang mai, opens to guests',
  zhTitle: '亭阁酒店清迈店正式向宾客开放',
  category: 'news',
  zhCategory: '新闻',
  date: '3 september 2023',
  summary:
    "after three years of design and construction, the pavilion hotel has opened its doors in the foothills of chiang mai, thailand. the project marks a significant milestone for a+pgrp's hospitality portfolio.",
  zhSummary:
    '经过三年的设计与建造，亭阁酒店已在泰国清迈山麓正式开业，为a+pgrp酒店业务组合树立了重要里程碑。',
  imageUrl: image,
  body: [
    "the pavilion hotel, chiang mai, has officially opened following three years of design development and construction. the project represents one of the most significant hospitality commissions in a+pgrp's two-decade history.",
    'set within four hectares of mature gardens at the foothills of doi suthep, the resort comprises thirty-two pavilion villas and a central arrival building housing dining, spa, and event facilities.',
    'the design draws on the architectural traditions of northern thailand, reinterpreting vernacular forms and materials through a contemporary lens. local teak, natural stone, and hand-fired ceramics appear throughout, crafted by regional artisans.',
    '"we spent considerable time understanding the culture, the climate, and the particular quality of light in chiang mai before beginning to design," said founding partner mei mei leong. "the result is a place that feels genuinely of its setting."',
  ],
} satisfies Article

export default article
