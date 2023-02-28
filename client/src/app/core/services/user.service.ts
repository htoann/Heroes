import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient) { }
  // private URL = "https://60c9e7eb772a760017204b93.mockapi.io/todolist";
  private authURL = "http://localhost:8000/api/auth";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(user: User) {
    return this.http.post<User>(this.authURL, user, this.httpOptions)
  }

  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id = ${id}`))
  //   );
  // }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.authURL, hero, this.httpOptions)
  }
}
