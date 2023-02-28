import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageService } from 'src/app/message.service';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any | null>;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  }

  private authUrl = "http://localhost:8000/api/auth";

  public get userValue() {
    return this.userSubject.value?.user;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }

  login(email: string, password: string): Observable<User> {
    console.log("Login service", { email, password })
    return this.http.post<any>(`${this.authUrl}/login`, { email, password }, this.httpOptions).pipe(
      map(user => {
        console.log("User", user.user)
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user.user;
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(email: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/register`, { email, password }, this.httpOptions).pipe(
      map(user => {
        console.log("User", user.user)
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user.user;
      })
    )
  }

  getAll() {
    return this.http.get<User[]>(`${this.authUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.authUrl}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.http.patch(`${this.authUrl}/users/${id}`, params)
      .pipe(map(x => {
        if (id == this.userValue?._id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // Publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
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
