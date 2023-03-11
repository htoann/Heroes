import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Hero } from '../../models/hero.model';
import { ToastService } from '../toast.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeroApiService {
  constructor(
    private location: Location,
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastService) {
  }
  private heroesUrl = environment.heroesUrl
  private userUrl = environment.userUrl

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes() {
    return this.http.get<Hero[]>(`${this.heroesUrl}/list/${this.authService.currentUserId}`);
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    return this.http.patch<Hero>(url, hero, this.httpOptions).pipe(
      tap(_ => {
        this.toastr.showSuccess("Update hero successfully");
        this.location.back();
      })
    )
  }

  createHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, { name }, this.httpOptions).pipe(
      tap((newHero: Hero) => {
      }),
      catchError((error) => {
        this.toastr.showError(error.error)
        return of(error)
      })
    )
  }

  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => {
        this.toastr.showSuccess("Delete hero successfully");
        this.location.back();
      }),
    );
  }

  deleteHeroes(ids: string[]): Observable<Hero> {
    const url = `${this.heroesUrl}`;
    return this.http.delete<Hero>(url, this.httpOptions)
  }
}
