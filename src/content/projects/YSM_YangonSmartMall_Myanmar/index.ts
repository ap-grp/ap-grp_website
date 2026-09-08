import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'
import gallery05 from './images/gallery-05.jpg'
import gallery06 from './images/gallery-06.jpg'
import gallery07 from './images/gallery-07.jpg'
import gallery08 from './images/gallery-08.jpg'

const project = {
  slug: 'ysm-yangon-smart-mall-myanmar',
  title: { en: 'yangon smart mall', zh: '仰光智慧商城' },
  location: { en: 'yangon, myanmar', zh: '仰光，缅甸' },
  year: '',
  type: ['masterplanning'],
  status: 'concept',
  gfa: '358,650.34 sqm',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07, gallery08],
  related: [],
} satisfies Project

export default project