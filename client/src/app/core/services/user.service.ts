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

  private userUrl = "http://localhost:8001/api/user";

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

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getMe() {
    return this.http.get<User>(`${this.userUrl}/me`);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user._id}`;
    return this.http.patch<User>(url, user, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${user._id}`)),
    )
  }
}
