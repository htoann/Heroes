import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of, mergeMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from './user.actions'
import { AuthService } from './../../services/auth.service';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.getUser),
    mergeMap((action) => this.userService.getUser(action.id)),
    map(user => userActions.getUserSuccess({ user })),
    catchError(error => of(userActions.getUserFailed({ error })))
  ))

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.updateUser),
    mergeMap((action) => this.userService.updateUser(action.user)),
    map(user => userActions.updateUserSuccess({ user })),
    catchError(error => of(userActions.updateUserFailed({ error })))
  )
  )
}
