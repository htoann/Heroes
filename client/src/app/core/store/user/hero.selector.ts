import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroState } from './hero.state';

const featureHero = createFeatureSelector<HeroState>('feature_hero')

export const heroesSelector = createSelector(featureHero, state => state.items)
export const currentHeroSelector = createSelector(featureHero, state => state.currentItem)
export const heroStatusSelector = createSelector(featureHero, state => state.error)
