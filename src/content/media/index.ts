import baliResortProgress from './bali-resort-progress'
import insightsTropicalArchitecture from './insights-tropical-architecture'
import newSingaporeStudio from './new-singapore-studio'
import pavilionHotelOpens from './pavilion-hotel-opens'
import siaAward2023 from './sia-award-2023'
import wellnessTownshipFeatured from './wellness-township-featured'

import type { Article } from './types'

export type { Article } from './types'

export const articles: Article[] = [
  siaAward2023,
  pavilionHotelOpens,
  wellnessTownshipFeatured,
  newSingaporeStudio,
  baliResortProgress,
  insightsTropicalArchitecture,
]

// The article featured on the Home page.
// Keep this separate from `articles` so the Home page feature can be changed
// without reordering the main Media page.
export const featuredArticle: Article = siaAward2023
