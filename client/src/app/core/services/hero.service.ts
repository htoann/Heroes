import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { Observable, tap, of } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private userService: UserService,
    private http: HttpClient, private messageService: MessageService, private authService: AuthService) {
  }
  private heroesUrl = environment.heroesUrl
  private userUrl = environment.userUrl

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes() {
    return this.http.get<Hero[]>(`${this.heroesUrl}/${this.authService.currentUserId}/my-heroes`).pipe(
      tap(_ => this.log('Fetched heroes')),
    )
  }

  getMyHeroes() {
    return this.http.get<Hero[]>(`${this.heroesUrl}/${this.authService.currentUserId}/my-heroes`).pipe(
      tap(_ => this.log('Fetched heroes')),
    )
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    return this.http.patch<Hero>(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero._id}`)),
    )
  }

  addTagsToHeroes(heroIds: any, tags: any): Observable<any> {
    const url = `${this.heroesUrl}/tags`;
    const body = { heroIds, tags }
    
    return this.http.patch<any>(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`Add tags for heroes`)),
    )
  }

  deleteTagsFromHeroes(heroIds: any, tags: any): Observable<any> {
    const url = `${this.heroesUrl}/tags/delete`;
    const body = { heroIds, tags }

    return this.http.patch<any>(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`Delete tags for heroes`)),
    )
  }

  createHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, { name }, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Add hero w/ id=${newHero._id}`)),
    )
  }

  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${id}`)),
    );
  }

  deleteHeroes(ids: string[]): Observable<Hero> {
    const url = `${this.heroesUrl}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${ids}`)),
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/search?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`Found heroes matching "${term}"`) :
        this.log(`No heroes matching "${term}"`)),
    );
  }
}
