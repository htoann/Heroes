import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as heroActions from './hero.actions'
import { HeroService } from './../../services/hero.service';

@Injectable()
export class HeroEffects {

  loadHeroes$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.getHeroes),
    mergeMap(() => this.heroService.getHeroes()),
    map(heroes => heroActions.getHeroesSuccess({ heroes })),
    catchError(error => of(heroActions.getHeroesFailed({ error })))
  )
  );

  loadMyHeroes$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.getMyHeroes),
    mergeMap(() => this.heroService.getMyHeroes()),
    map(heroes => heroActions.getMyHeroesSuccess({ heroes })),
    catchError(error => of(heroActions.getMyHeroesFailed({ error })))
  )
  );

  loadHero$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.getHero),
    mergeMap((action) => this.heroService.getHero(action.id)),
    map(hero => heroActions.getHeroSuccess({ hero })),
    catchError(error => of(heroActions.getHeroFailed({ error })))
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

  deleteHero$ = createEffect(() => this.actions$.pipe(
    ofType(heroActions.deleteHero),
    mergeMap((action) => this.heroService.deleteHero(action.id)),
    map(hero => heroActions.deleteHeroSuccess({ id: hero._id })),
    catchError(error => of(heroActions.deleteHeroFailed({ error })))
  )
  )

  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {
  }
}
