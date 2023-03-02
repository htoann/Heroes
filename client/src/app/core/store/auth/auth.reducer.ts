import * as AuthActions from './auth.actions'
import { AuthState } from './auth.state';

const initialState: AuthState = {
  user: null,
  status: 'idle'
}

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions): AuthState {
  switch (action.type) {
    case AuthActions.REGISTER: {
      return { ...state, status: 'loading' }
    }
    case AuthActions.REGISTER_SUCCESS: {
      return { ...state, status: 'idle', user: action.user }
    }
    case AuthActions.REGISTER_FAILED: {
      return { ...state, status: 'error', user: null, error: action.error };
    }
    case AuthActions.LOGIN: {
      return { ...state, status: 'loading' }
    }
    case AuthActions.LOGIN_SUCCESS: {
      return { ...state, status: 'idle', user: action.user }
    }
    case AuthActions.LOGIN_FAILED: {
      return { ...state, status: 'error', user: null, error: action.error };
    }
    case AuthActions.LOGOUT: {
      return { ...state, status: 'loading' }
    }
    case AuthActions.LOGOUT_SUCCESS: {
      return { ...state, status: 'idle', user: null }
    }
      
    case AuthActions.FETCH_USER: {
      return { ...state, status: 'loading' };
    }
    case AuthActions.FETCH_USER_SUCCESS: {
      return { ...state, status: 'idle', user: action.user };
    }
    case AuthActions.FETCH_USER_FAILED: {
      return { ...state, status: 'error', user: null, error: action.error };
    }
    default:
      return state

  }
}
