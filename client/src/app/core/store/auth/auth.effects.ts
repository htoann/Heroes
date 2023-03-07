import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions'
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      exhaustMap((action) =>
        this.authService.register(action.email, action.password).pipe(
          map((response) => authActions.registerSuccess({ user: response.user })),
          catchError((error) => of(authActions.registerFailed({ error: error.message })))
        )
      )
    )
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType((authActions.login)),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) => authActions.loginSuccess({ user: response.user })),
          catchError((error) => of(authActions.loginFailed({ error: error.message })))
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => authActions.logoutSuccess())
        )
      )
    )
  );

  // fetchUser$ = createEffect(() => this.actions$.pipe(
  //   ofType((authActions.fetchUser)),
  //   switchMap(() => {
  //     const token = localStorage.getItem('token')

  //     if (!token) {
  //       return of(authActions.fetchUserFailed({ error: 'Token not found in local storage.' }));
  //     }
  //     return this.authService.fetchUser(token).pipe(
  //       map(user => authActions.fetchUserSuccess({ user })),
  //       catchError(error => of(authActions.fetchUserFailed({ error })))
  //     );
  //   })
  // ));

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }
}
