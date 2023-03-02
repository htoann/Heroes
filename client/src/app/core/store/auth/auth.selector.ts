import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const featureHero = createFeatureSelector<AuthState>('feature_auth')

export const userSelector = createSelector(featureHero, state => state.user)
export const authStatusSelector = createSelector(featureHero, state => state.status)