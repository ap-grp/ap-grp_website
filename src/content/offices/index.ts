import type { LocalizedText } from '../types'

export type OfficeMapLabelAnchor = 'start' | 'end'

export interface OfficeMapPin {
  label: LocalizedText
  lon: number
  lat: number
  anchor: OfficeMapLabelAnchor
  dx: number
  dy: number
}

export interface Office {
  slug: string
  name: LocalizedText
  address: Record<'en' | 'zh', string[]>
  phone?: string
  email: string
  isHeadquarters?: boolean
  directionsUrl?: string
  mapEmbedUrl?: string
  mapPin?: OfficeMapPin
}

export const offices: Office[] = [
  {
    slug: 'singapore',
    name: { en: 'singapore (corporate hq)', zh: '新加坡（企业总部）' },
    address: {
      en: ['43 science park road', '#01-11 science park 2', 'singapore 117408'],
      zh: ['科学园路43号', '#01-11 科学园2期', '新加坡 117408'],
    },
    email: 'info@ap-grp.com',
    isHeadquarters: true,
    directionsUrl: 'https://maps.app.goo.gl/AUXHGuerxa82f9Px8',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8096865185225!2d103.7804712756792!3d1.288359261768946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1972d88d3dd7%3A0x4be1ce10337fa18f!2sA%2BPgrp!5e0!3m2!1sen!2ssg!4v1785294402899!5m2!1sen!2ssg',
    mapPin: {
      label: { en: 'singapore (hq)', zh: '新加坡（总部）' },
      lon: 103.82,
      lat: 1.35,
      anchor: 'end',
      dx: 8,
      dy: 0,
    },
  },
  {
    slug: 'beijing',
    name: { en: 'beijing (china hq)', zh: '北京（中国总部）' },
    address: {
      en: ['3rd floor, bldg 35, no. 135 north lishi road, xicheng, beijing 100037'],
      zh: ['西城区礼士路北街135号35号楼三层，北京 100037'],
    },
    phone: '010-68330573',
    email: 'ap-bj@ap-grp.com',
    mapPin: {
      label: { en: 'beijing', zh: '北京' },
      lon: 116.4,
      lat: 39.9,
      anchor: 'start',
      dx: 0,
      dy: 0,
    },
  },
  {
    slug: 'shanghai',
    name: { en: 'shanghai, china', zh: '上海，中国' },
    address: {
      en: ['2302, ocean plaza, 1188 siping road, shanghai 200092'],
      zh: ['四平路1188号海洋广场2302室，上海 200092'],
    },
    phone: '021-65797261',
    email: 'ap-sh@ap-grp.com',
    mapPin: {
      label: { en: 'shanghai', zh: '上海' },
      lon: 121.47,
      lat: 31.23,
      anchor: 'start',
      dx: -5,
      dy: 0,
    },
  },
  {
    slug: 'suzhou',
    name: { en: 'suzhou, china', zh: '苏州，中国' },
    address: {
      en: ['803, bldg b, huihu building, no. 10 yuewan road, suzhou park 215123'],
      zh: ['越湾路10号汇湖商务楼B座803室，苏州园区 215123'],
    },
    phone: '0512-62761650',
    email: 'ap-sz@ap-grp.com',
    mapPin: {
      label: { en: 'suzhou', zh: '苏州' },
      lon: 120.62,
      lat: 31.3,
      anchor: 'end',
      dx: -1,
      dy: 1,
    },
  },
  {
    slug: 'nanjing',
    name: { en: 'nanjing, china', zh: '南京，中国' },
    address: {
      en: ['9th floor, jinji plaza, no. 270 shuiximen street, jianye district, nanjing 210002'],
      zh: ['建邺区水西门大街270号金基广场9楼，南京 210002'],
    },
    phone: '025-83327939',
    email: 'ap-nj@ap-grp.com',
    mapPin: {
      label: { en: 'nanjing', zh: '南京' },
      lon: 118.78,
      lat: 32.06,
      anchor: 'end',
      dx: 2,
      dy: -7,
    },
  },
  {
    slug: 'yangon',
    name: { en: 'yangon, myanmar', zh: '仰光，缅甸' },
    address: {
      en: ['56 kabaraye pagoda road, yangon, myanmar 11081'],
      zh: ['卡巴耶佛塔路56号，仰光，缅甸 11081'],
    },
    phone: '+95 1666 710',
    email: 'info@ap-grp.com',
    mapPin: {
      label: { en: 'yangon', zh: '仰光' },
      lon: 96.17,
      lat: 16.85,
      anchor: 'end',
      dx: 4,
      dy: 0,
    },
  },
  {
    slug: 'cebu',
    name: { en: 'cebu, philippines', zh: '宿务，菲律宾' },
    address: {
      en: ['unit 821, lot 8 bldg, p almendas ext. cebu, philippines 6000'],
      zh: ['P阿尔门达斯延伸段8号地块8号楼821单元，宿务，菲律宾 6000'],
    },
    phone: '+63 32 260 6918',
    email: 'info@ap-grp.com',
    mapPin: {
      label: { en: 'cebu', zh: '宿务' },
      lon: 123.89,
      lat: 10.32,
      anchor: 'start',
      dx: -5,
      dy: 0,
    },
  },
]

export const headquarters = offices.find((office) => office.isHeadquarters)!
export const otherOffices = offices.filter((office) => !office.isHeadquarters)
export const officeMapPins = offices.flatMap((office) =>
  office.mapPin
    ? [{
        slug: office.slug,
        name: office.name,
        address: office.address,
        phone: office.phone,
        email: office.email,
        ...office.mapPin,
      }]
    : [],
)
