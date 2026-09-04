import type { Project } from '../../types'

import cover from './images/cover.jpg'
import gallery01 from './images/gallery-01.jpg'
import gallery02 from './images/gallery-02.jpg'
import gallery03 from './images/gallery-03.jpg'
import gallery04 from './images/gallery-04.jpg'

const project = {
  slug: 'dic-defu-industrial-city-singapore',
  title: { en: 'defu industrial city', zh: '德福工业城' },
  location: { en: 'singapore', zh: '新加坡' },
  year: '2019',
  type: ['industrial'],
  status: 'completed',
  gfa: '98,264.32 sqm',
  estimatedCost: 'USD 60M',
  description: { en: '', zh: '' },
  awards: [
    {
      en: 'building & construction authority (bca) singapore - green mark gold plus',
      zh: '新加坡建设局（bca）绿色建筑标志金级加强认证（green mark gold plus）',
    }
  ],
  images: [cover, gallery01, gallery02, gallery03, gallery04],
  related: [],
} satisfies Project

export default project
