import { ActionType, createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const POST_LOGIN = '@User/PostAll'
export const POST_LOGIN_SUCCESS = '@User/PostSuccess'
export const POST_LOGIN_FAILED = '@User/PostFailed'

export const POST_REGISTER = '@User/PostAll'
export const POST_REGISTER_SUCCESS = '@User/PostSuccess'
export const POST_REGISTER_FAILED = '@User/PostFailed'

export const postLogin = createAction(POST_LOGIN, props<{ user: User }>());
export const postLoginSuccess = createAction(POST_LOGIN_SUCCESS, props<{ user: User }>());
export const postLoginFailed = createAction(POST_LOGIN_FAILED, props<{ error?: string }>());

export type UserActions = ActionType<typeof postLogin>
  | ActionType<typeof postLoginSuccess>
  | ActionType<typeof postLoginFailed>