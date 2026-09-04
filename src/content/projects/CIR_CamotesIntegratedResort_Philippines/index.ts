import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'
import gallery05 from './images/gallery-05.jpg'
import gallery06 from './images/gallery-06.jpg'
import gallery07 from './images/gallery-07.jpg'

const project = {
  slug: 'cir-camotes-integrated-resort-philippines',
  title: { en: 'camotes integrated resort', zh: 'camotes integrated resort' },
  location: { en: 'camotes islands, philippines', zh: '卡莫特斯群岛，菲律宾' },
  year: '',
  type: ['hospitality'],
  status: 'design development',
  gfa: '',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07],
  related: [],
} satisfies Project

export default project
