import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroEffects } from './store/hero/hero.effects';
import { heroReducer } from './store/hero/hero.reducer';
import { userReducer } from './store/user/user.reducer';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { UserEffects } from './store/user/user.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_hero', heroReducer),
    StoreModule.forFeature('feature_user', userReducer),
    StoreModule.forFeature('feature_auth', authReducer),
    EffectsModule.forFeature([HeroEffects, AuthEffects, UserEffects])
  ]
})
export class CoreModule { }