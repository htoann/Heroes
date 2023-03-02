import { ActionType, createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const REGISTER = '@Auth/Register'
export const REGISTER_SUCCESS = '@Auth/RegisterSuccess'
export const REGISTER_FAILED = '@Auth/RegisterFailed'

export const LOGIN = '@Auth/Login'
export const LOGIN_SUCCESS = '@Auth/LoginSuccess'
export const LOGIN_FAILED = '@Auth/LoginFailed'

export const LOGOUT = '@Auth/Logout'
export const LOGOUT_SUCCESS = '@Auth/LogoutSuccess'


export const FETCH_USER = '@Auth/FetchUser';
export const FETCH_USER_SUCCESS = '@Auth/FetchUserSuccess';
export const FETCH_USER_FAILED = '@Auth/FetchUserFailed';

export const register = createAction(REGISTER, props<{ email: string, password: string }>());
export const registerSuccess = createAction(REGISTER_SUCCESS, props<{ user: User }>());
export const registerFailed = createAction(REGISTER_FAILED, props<{ error?: string }>());
export const login = createAction(LOGIN, props<{ email: string, password: string }>())
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
export const loginFailed = createAction(LOGIN_FAILED, props<{ error?: string }>());
export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const fetchUser = createAction(FETCH_USER);
export const fetchUserSuccess = createAction(FETCH_USER_SUCCESS, props<{ user: User }>());
export const fetchUserFailed = createAction(FETCH_USER_FAILED, props<{ error: string }>());

export type AuthActions = ActionType<typeof register>
  | ActionType<typeof registerSuccess>
  | ActionType<typeof registerFailed>
  | ActionType<typeof login>
  | ActionType<typeof loginSuccess>
  | ActionType<typeof loginFailed>
  | ActionType<typeof logout>
  | ActionType<typeof logoutSuccess>
  | ActionType<typeof fetchUser>
  | ActionType<typeof fetchUserSuccess>
  | ActionType<typeof fetchUserFailed>
