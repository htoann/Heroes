export interface Hero {
  _id: string
  name: string
  address?: string
  mail?: string
  age?: number
  gender?: string
  userId?: string
  tags?: string[]
}

export interface HeroSelected extends Hero {
  selected?: boolean;
}