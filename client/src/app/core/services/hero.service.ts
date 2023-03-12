import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createHero, deleteHero, getHero, getHeroes, updateHero } from '../store/hero/hero.actions';
import { AppState } from '../store/app.state';
import { select, Store } from '@ngrx/store';
import { currentHeroSelector, heroesSelector } from '../store/hero/hero.selector';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>) {
  }
  private heroesUrl = environment.heroesUrl

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createHero(name: string): void {
    this.store.dispatch(createHero({ name }));
  }

  getHeroes() {
    this.store.dispatch(getHeroes())
    return this.store.pipe(select(heroesSelector))
  }

  public getHero(id: string) {
    this.store.dispatch(getHero({ id }))
    return this.store.pipe(select(currentHeroSelector))
  }

  updateHero(updatedHero: Hero): void {
    this.store.dispatch(updateHero({ hero: updatedHero }))
  }

  deleteHero(id: string): void {
    this.store.dispatch(deleteHero({ id }))
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      // tap(x => x.length ?
      //   this.log(`Found heroes matching "${term}"`) :
      //   this.log(`No heroes matching "${term}"`)),
      // catchError((error) => {
      //   this.toastr.showError(error.error)
      //   return of(error)
      // })
    );
  }

  addTagsToHeroes(heroIds: string[], tags: string[]): Observable<any> {
    const url = `${this.heroesUrl}/tags?action=add`;
    const body = { heroIds, tags }

    return this.http.patch<any>(url, body, this.httpOptions)
  }

  deleteTagsFromHeroes(heroIds: string[], tags: string[]): Observable<any> {
    const url = `${this.heroesUrl}/tags?action=delete`;
    const body = { heroIds, tags }

    return this.http.patch<any>(url, body, this.httpOptions)
  }
}