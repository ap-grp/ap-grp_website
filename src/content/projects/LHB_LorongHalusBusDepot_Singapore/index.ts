import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'

const project = {
  slug: 'lhb-lorong-halus-bus-depot-singapore',
  title: { en: 'lorong halus bus depot', zh: '罗弄哈鲁士巴士车厂' },
  location: { en: 'singapore', zh: '新加坡' },
  year: '',
  type: ['transport hubs'],
  status: 'tender',
  gfa: '81,900 sqm',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04],
  related: [],
} satisfies Project

export default project
