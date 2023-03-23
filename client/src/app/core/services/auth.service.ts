import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject, map, catchError } from 'rxjs';
import { User, UserResponse } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private toastr: ToastService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private authUrl = environment.authUrl;
  private userUrl = environment.userUrl;

  public get currentUserValue(): UserResponse {
    return this.currentUserSubject.value;
  }

  public get currentUserId(): User {
    return this.currentUserSubject.value._id
  }

  public get token(): string {
    return JSON.parse(localStorage.getItem('token')!)
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  register(email: string, password: string) {
    const body = { email, password };
    const url = `${this.authUrl}/register`
    return this.http.post<UserResponse>(url, body, this.httpOptions).pipe(
      tap(res => {
        this.toastr.showSuccess("Register successfully");
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('token', JSON.stringify(res.token))
        this.currentUserSubject.next(res.user);
        return res;
      })
    )

  }

  login(email: string, password: string): Observable<UserResponse> {
    const body = { email, password };
    const url = `${this.authUrl}/login`
    return this.http.post<UserResponse>(url, body, this.httpOptions).pipe(
      map(res => {
        this.toastr.showSuccess("Login successfully");
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('token', JSON.stringify(res.token))
        this.currentUserSubject.next(res.user);
        return res;
      })
    );
  }

  logout(): Observable<boolean> {
    this.toastr.showSuccess("Logout successfully");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    return of(true); // Return an observable with the logout status
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user._id}`;
    return this.http.patch<User>(url, user, this.httpOptions).pipe(
      tap(user => {
        this.toastr.showSuccess("Update profile successfully");
        localStorage.setItem('user', JSON.stringify(user))
        this.currentUserSubject.next(user);
        return user;
      }),
    )
  }
}