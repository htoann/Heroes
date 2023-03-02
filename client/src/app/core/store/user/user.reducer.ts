import { User } from '../../models/user.model'
import * as UserActions from './user.actions'
import { UserState } from './user.state'

const initialState: UserState = {
  user: {} as User,
  status: 'idle',
}

export function userReducer(state: UserState = initialState, action: UserActions.UserActions): UserState {
  switch (action.type) {
    case UserActions.GET_USER:
      return { ...state, status: 'loading' }
    case UserActions.GET_USER_SUCCESS:
      return { ...state, status: 'idle', user: action.user }
    case UserActions.GET_USER_FAILED:
      return { ...state, status: 'error', error: action.error }

    case UserActions.UPDATE_USER:
      return { ...state, status: 'loading' }
    case UserActions.UPDATE_USER_SUCCESS:
      return { ...state, status: 'idle', user: action.user, error: '' }
    case UserActions.UPDATE_USER_FAILED:
      return { ...state, status: 'error', error: action.error }

    default:
      return state
  }
}
