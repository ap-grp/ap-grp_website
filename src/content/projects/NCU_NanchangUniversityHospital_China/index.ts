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
  slug: 'ncu-nanchang-university-hospital-china',
  title: { en: 'nanchang university hospital', zh: '南昌大学医院' },
  location: { en: 'nanchang, china', zh: '南昌，中国' },
  year: '',
  type: ['institutional'],
  status: 'proposed',
  gfa: '166,700 sqm',
  estimatedCost: '',
  description: {
  en: 'nanchang university hongjiaozhou branch is planned as a 1,000-bed medical campus in nanchang, with a total gross floor area of approximately 166,700 sqm. \n'+
  'the masterplan adopts a compact, human-centred approach, organising outpatient, emergency, inpatient, medical technology, teaching and research functions around a clear medical street. \n' + 
  'separated patient, staff, service and vehicular circulation improves operational efficiency while creating an intuitive and legible hospital environment. landscaped courtyards, green buffers, roof gardens and naturally lit public spaces are integrated throughout the campus to soften the clinical environment and support patient wellbeing. a restrained contemporary architectural language unifies the building cluster, while flexible planning and reserved expansion areas allow the hospital to adapt to future healthcare needs.',
  zh: '南昌大学第二附属医院红角洲分院规划为一座拥有1000张床位的现代化医疗园区，总建筑面积约166,890平方米。\n' +
  '总体规划以紧凑、高效及以人为本为设计原则，通过清晰的医疗街串联门诊、急诊、住院、医技、教学及科研等主要功能。医患、后勤及车辆流线相对独立，在提升医院运行效率的同时，形成清晰易识别的空间体系。\n' +
  '项目将绿化庭院、生态隔离带、屋顶花园及自然采光的公共空间融入医疗环境，营造更加舒适和人性化的就医体验。简洁现代的建筑语言统一整个建筑群，同时通过灵活的空间组织及预留发展空间，为医院未来的扩建与功能调整提供条件。'
},
  awards: [],
  images: [cover, gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07, gallery08],
  related: [],
} satisfies Project

export default project
