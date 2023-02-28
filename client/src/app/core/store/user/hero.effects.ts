import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as heroActions from './hero.actions'
import { HeroService } from '../../services/hero.service';

@Injectable()
export class HeroEffects {

  loadHeroes$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.getHeroes),
    mergeMap(() => this.heroService.getHeroes()),
    map(heroes => heroActions.getHeroesSuccess({ heroes })),
    catchError(error => of(heroActions.getHeroFailed({ error })))
  )
  );

  loadHero$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.getHero),
    mergeMap((action) => this.heroService.getHero(action.id)),
    map(hero => heroActions.getHeroSuccess({ hero })),
    catchError(error => of(heroActions.getHeroesFailed({ error })))
  ))
  
  createHero$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.createHero),
    exhaustMap((action) => this.heroService.createHero(action.name)),
    map(hero => heroActions.createHeroSuccess({ hero })),
    catchError(error => of(heroActions.createHeroFailed({ error })))
  )
  )
  updateHero$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.updateHero),
    mergeMap((action) => this.heroService.updateHero(action.hero)),
    map(hero => heroActions.updateHeroSuccess({ hero })),
    catchError(error => of(heroActions.updateHeroFailed({ error })))
  )
  )

  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {
  }
}
