import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroEffects } from './store/hero/hero.effects';
import { heroReducer } from './store/hero/hero.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_hero', heroReducer),
    EffectsModule.forFeature([HeroEffects])
  ]
})
export class CoreModule { }
