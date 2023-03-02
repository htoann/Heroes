import { ActionType, createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const GET_USER = '@User/Get'
export const GET_USER_SUCCESS = '@User/GetSuccess'
export const GET_USER_FAILED = '@User/GetFailed'

export const UPDATE_USER = '@User/Update'
export const UPDATE_USER_SUCCESS = '@User/UpdateSuccess';
export const UPDATE_USER_FAILED = '@User/UpdateFailed';

export const getUser = createAction(GET_USER, props<{ id: string }>())
export const getUserSuccess = createAction(GET_USER_SUCCESS, props<{ user: User }>());
export const getUserFailed = createAction(GET_USER_FAILED, props<{ error?: string }>());

export const updateUser = createAction(UPDATE_USER, props<{ user: User }>())
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{ user: User }>());
export const updateUserFailed = createAction(UPDATE_USER_FAILED, props<{ error?: string }>());

export type UserActions =
  | ActionType<typeof getUser>
  | ActionType<typeof getUserSuccess>
  | ActionType<typeof getUserFailed>
  | ActionType<typeof updateUser>
  | ActionType<typeof updateUserSuccess>
  | ActionType<typeof updateUserFailed>