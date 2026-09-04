import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'

const project = {
  slug: 'ted-terusan-edge-dormitory-singapore',
  title: { en: 'terusan edge dormitory', zh: 'terusan edge dormitory' },
  location: { en: 'singapore', zh: '新加坡' },
  year: '',
  type: ['industrial'],
  status: 'tender',
  gfa: '29843.06',
  estimatedCost: '',
  description: { en: '', zh: '' },
  awards: [],
  images: [cover, gallery01, gallery02, gallery03],
  related: [],
} satisfies Project

export default project
