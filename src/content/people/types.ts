import type { LocalizedText } from '../types'

export interface Person {
  slug: string
  name: LocalizedText
  position: LocalizedText
  isPartner: boolean
  imageUrl: string
  bio: LocalizedText
  qualifications: LocalizedText[]
  experience: LocalizedText[]
  awards?: LocalizedText[]
}
