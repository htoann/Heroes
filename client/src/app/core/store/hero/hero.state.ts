import { Hero } from "../../models/hero.model";

export interface HeroState {
  items: Hero[];
  myHeroes: Hero[];
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: string
  currentItem: Hero | null
}
