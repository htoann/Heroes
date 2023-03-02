import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, tap, catchError } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService, private authService: AuthService) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  private userUrl = "http://localhost:8000/api/user";

  public get userValue() {
    return this.userSubject.value?.user;
  }

  public get userId() {
    return this.userSubject.value?.user._id;
  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem('user')!)?.token
  }

  // public getUser(): string {
  //   return JSON.parse(localStorage.getItem('user')!).user
  // }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user._id}`;
    // return this.http.patch<User>(url, user, this.httpOptions).pipe(
    //   map(x => {
    //     if (user._id == this.authService.getUserId()) {
    //       const newUser = { ...this.userValue, ...user };
    //       localStorage.setItem('user', JSON.stringify(newUser));

    //       // Publish updated user to subscribers
    //       this.userSubject.next(user);
    //     }
    //     return x;
    //   })
    // )
    return this.http.patch<User>(url, user, this.httpOptions).pipe(
      // map(x => {
      //   // const token = JSON.parse(localStorage.getItem('user')!).token;
      //   // localStorage.setItem('user', JSON.stringify(user, token));

      //   return x;
      // }),
      tap(_ => this.log(`Updated hero id=${user._id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
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
