import { AuthState } from './auth/auth.state';
import { HeroState } from './hero/hero.state';
import { UserState } from './user/user.state';

export interface AppState {
  feature_hero: HeroState
  feature_auth: AuthState
  feature_user: UserState
}
