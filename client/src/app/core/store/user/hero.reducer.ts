import { HeroState } from './hero.state';
import * as HeroActions from './hero.actions'

const initialState: HeroState = {
  items: [],
  status: 'idle',
  currentItem: null
}

export function heroReducer(state: HeroState = initialState, action: HeroActions.HeroActions): HeroState {
  switch (action.type) {
    case HeroActions.GET_HEROES:
      return { ...state, status: 'loading' }
    case HeroActions.GET_HEROES_SUCCESS:
      return { ...state, status: 'idle', items: action.heroes, error: '' }
    case HeroActions.GET_HEROES_FAILED:
      return { ...state, status: 'error', items: [], error: action.error }
    case HeroActions.GET_HERO:
      return { ...state, status: 'loading' }
    case HeroActions.GET_HERO_SUCCESS:
      return { ...state, status: 'idle', currentItem: action.hero }
    case HeroActions.GET_HERO_FAILED:
      return { ...state, status: 'error', currentItem: null, error: action.error }
    case HeroActions.CREATE_HERO:
      return { ...state, status: 'loading' };
    case HeroActions.CREATE_HERO_SUCCESS:
      return { ...state, status: 'idle', items: [...state.items, action.hero] };
    case HeroActions.CREATE_HERO_FAILED:
      return { ...state, status: 'error', error: action.error };
    case HeroActions.UPDATE_HERO:
      return { ...state, status: 'loading' }
    case HeroActions.UPDATE_HERO_SUCCESS:
      const updatedItems = state.items.map(item => item._id === action.hero._id ? action.hero : item);
      return { ...state, status: 'idle', items: updatedItems, error: '' }
    case HeroActions.UPDATE_HERO_FAILED:
      return { ...state, status: 'error', error: action.error }
    case HeroActions.DELETE_HERO:
      return { ...state, status: 'loading' };
    case HeroActions.DELETE_HERO_SUCCESS:
      const newItems = state.items.filter((item) => item._id !== action.id);
      return { ...state, status: 'idle', items: newItems };
    case HeroActions.DELETE_HERO_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state
  }

}
