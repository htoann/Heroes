import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { Observable, tap, of } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private userService: UserService,
    private http: HttpClient, private messageService: MessageService, private authService: AuthService) {
  }
  private heroesUrl = "http://localhost:8000/api/heroes";
  private userUrl = "http://localhost:8001/api/user";



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes() {
    // return this.http.get<Hero[]>(this.heroesUrl).pipe(
    return this.http.get<Hero[]>(`${this.heroesUrl}/${this.userService.userValue._id}/my-heroes`).pipe(
      tap(_ => this.log('Fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getMyHeroes() {
    return this.http.get<Hero[]>(`${this.heroesUrl}/${this.userService.userValue._id}/my-heroes`).pipe(
      tap(_ => this.log('Fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    return this.http.patch<Hero>(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addTagsToHeroes(heroIds: any, tags: any): Observable<any> {
    const url = `${this.heroesUrl}/tags`;
    const body = { heroIds, tags }

    return this.http.patch<any>(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`Add tags for heroes`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  deleteTagsFromHeroes(heroIds: any, tags: any): Observable<any> {
    const url = `${this.heroesUrl}/tags/delete`;
    const body = { heroIds, tags }

    return this.http.patch<any>(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`Delete tags for heroes`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  createHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, { name }, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Add hero w/ id=${newHero._id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  deleteHeroes(ids: string[]): Observable<Hero> {
    const url = `${this.heroesUrl}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${ids}`)),
      catchError(this.handleError<Hero>('deleteHero'))
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
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
