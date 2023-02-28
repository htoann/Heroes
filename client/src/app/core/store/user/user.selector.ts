import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

const featureUser = createFeatureSelector<UserState>('feature_user')

export const userSelector = createSelector(featureUser, state => state.user)
export const userStatusSelector = createSelector(featureUser, state => state.error)