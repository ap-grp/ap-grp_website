import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'

const project = {
  slug: 'ste-st-engineering-aerospace-hangar-singapore',
  title: { en: 'st engineering aerospace hangar', zh: 'st engineering aerospace hangar' },
  location: { en: 'singapore', zh: '新加坡' },
  year: '2026',
  type: ['industrial', 'transport hubs'],
  status: 'completed',
  gfa: '48,668 sqm',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04],
  related: [],
} satisfies Project

export default project
