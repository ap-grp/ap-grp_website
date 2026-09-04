import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'

const project = {
  slug: 'ync-yangon-new-city-myanmar',
  title: { en: 'yangon new city', zh: '仰光新城' },
  location: { en: 'yangon, myanmar', zh: '仰光，缅甸' },
  year: '',
  type: ['masterplanning'],
  status: 'authority submission',
  gfa: '600,374.22 sqm',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04],
  related: [],
} satisfies Project

export default project
