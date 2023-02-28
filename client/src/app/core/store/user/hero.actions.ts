import { ActionType, createAction, props } from '@ngrx/store';
import { Hero } from '../../models/hero.model';

export const GET_HEROES = '@Hero/GetAll'
export const GET_HEROES_SUCCESS = '@Hero/GetAllSuccess'
export const GET_HEROES_FAILED = '@Hero/GetAllFailed'
export const GET_HERO = '@Hero/Get'
export const GET_HERO_SUCCESS = '@Hero/GetSuccess'
export const GET_HERO_FAILED = '@Hero/GetFailed'
export const CREATE_HERO = '@Hero/Create'
export const CREATE_HERO_SUCCESS = '@Hero/CreateSuccess';
export const CREATE_HERO_FAILED = '@Hero/CreateFailed';
export const UPDATE_HERO = '@Hero/Update'
export const UPDATE_HERO_SUCCESS = '@Hero/UpdateSuccess';
export const UPDATE_HERO_FAILED = '@Hero/UpdateFailed';
export const DELETE_HERO = '@Hero/Delete';
export const DELETE_HERO_SUCCESS = '@Hero/DeleteSuccess';
export const DELETE_HERO_FAILED = '@Hero/DeleteFailed';

export const getHeroes = createAction(GET_HEROES);
export const getHeroesSuccess = createAction(GET_HEROES_SUCCESS, props<{ heroes: Hero[] }>());
export const getHeroesFailed = createAction(GET_HEROES_FAILED, props<{ error?: string }>());
export const getHero = createAction(GET_HERO, props<{ id: string }>())
export const getHeroSuccess = createAction(GET_HERO_SUCCESS, props<{ hero: Hero }>());
export const getHeroFailed = createAction(GET_HERO_FAILED, props<{ error?: string }>());
export const createHero = createAction(CREATE_HERO, props<{ name: string }>())
export const createHeroSuccess = createAction(CREATE_HERO_SUCCESS, props<{ hero: Hero }>())
export const createHeroFailed = createAction(CREATE_HERO_FAILED, props<{ error?: string }>())
export const updateHero = createAction(UPDATE_HERO, props<{ hero: Hero }>())
export const updateHeroSuccess = createAction(UPDATE_HERO_SUCCESS, props<{ hero: Hero }>());
export const updateHeroFailed = createAction(UPDATE_HERO_FAILED, props<{ error?: string }>());
export const deleteHero = createAction(DELETE_HERO, props<{ id: string }>());
export const deleteHeroSuccess = createAction(DELETE_HERO_SUCCESS, props<{ id: string }>());
export const deleteHeroFailed = createAction(DELETE_HERO_FAILED, props<{ error?: string }>());

export type HeroActions = ActionType<typeof getHeroes>
  | ActionType<typeof getHeroesSuccess>
  | ActionType<typeof getHeroesFailed>
  | ActionType<typeof getHero>
  | ActionType<typeof getHeroSuccess>
  | ActionType<typeof getHeroFailed>
  | ActionType<typeof createHero>
  | ActionType<typeof createHeroSuccess>
  | ActionType<typeof createHeroFailed>
  | ActionType<typeof updateHero>
  | ActionType<typeof updateHeroSuccess>
  | ActionType<typeof updateHeroFailed>
  | ReturnType<typeof deleteHero>
  | ReturnType<typeof deleteHeroSuccess>
  | ReturnType<typeof deleteHeroFailed>;
