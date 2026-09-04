import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'
import gallery05 from './images/gallery-05.jpg'
import gallery06 from './images/gallery-06.jpg'


const project = {
  slug: 'psl-dagon-seikan-township-myanmar',
  title: { en: 'dagon seikan township', zh: 'dagon seikan township' },
  location: { en: 'yangon, myanmar', zh: '仰光, 缅甸' },
  year: '',
  type: ['masterplanning'],
  status: 'authority submission',
  gfa: '141,063.54 sqm',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05, gallery06],
  related: [],
} satisfies Project

export default project
