import { User } from '../../models/user.model'
import * as UserActions from './user.actions'
import { UserState } from './user.state'

const initialState: UserState = {
  user: {} as User,
  status: 'idle',
}

export function userReducer(state: UserState = initialState, action: UserActions.UserActions): UserState {
  switch (action.type) {
    case UserActions.POST_LOGIN:
      return { ...state, status: 'loading' }
    case UserActions.POST_LOGIN_SUCCESS:
      return { ...state, status: 'idle', user: action.user }
    case UserActions.POST_LOGIN_FAILED:
      return { ...state, status: 'error', error: action.error }
    
    default:
      return state
  }
}
