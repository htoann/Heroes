import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, tap } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { map } from 'rxjs/operators';
import { User, UserResponse } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
  }

  private authUrl = "http://localhost:8000/api/auth";
  private userUrl = "http://localhost:8000/api/user";

  public getToken(): string {
    return JSON.parse(localStorage.getItem('user')!)?.token
  }

  public getUser(): string {
    return JSON.parse(localStorage.getItem('user')!).user
  }

  public getUserId(): string {
    return JSON.parse(localStorage.getItem('user')!).user._id
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }

  register(email: string, password: string) {
    const body = { email, password };
    const url = `${this.authUrl}/register`
    return this.http.post<UserResponse>(url, body, this.httpOptions).pipe(
      tap(res => localStorage.setItem('token', res.token))
    )

  }

  login(email: string, password: string): Observable<UserResponse> {
    const body = { email, password };
    const url = `${this.authUrl}/login`
    return this.http.post<UserResponse>(url, body, this.httpOptions).pipe(
      tap(res => localStorage.setItem('user', JSON.stringify(res)))
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('user');
    return of(true); // Return an observable with the logout status
  }

  fetchUser(token: string): Observable<User> {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<User>(`${this.userUrl}/me`, { headers });
  }
}
