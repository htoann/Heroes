import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from './user.actions'
import { AuthService } from './../../services/auth.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.postLogin),
    exhaustMap((action: any) => this.authService.postLogin(action.email, action.password)),
    map(user => userActions.postLoginSuccess({ user })),
    catchError(error => of(userActions.postLoginFailed({ error })))
  )
  )
}
