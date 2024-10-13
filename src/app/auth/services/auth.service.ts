import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from '../interfaces/register-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  private _redirectUrl: string | null = null;
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.cheking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  setRedirectUrl(url: string) {
    console.log('AuthService: Setting redirect URL to:', url);
    this._redirectUrl = url;
  }

  getRedirectUrl(): string {
    const url = this._redirectUrl || '/dashboard';
    console.log('AuthService: Getting redirect URL:', url);
    return url;
  }

  clearRedirectUrl() {
    console.log('AuthService: Clearing redirect URL');
    this._redirectUrl = null;
  }

  private setAuthentication(user: User, token: string): boolean {
    if (!user || !token) {
      this.logout();
      return false;
    }

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => {
        localStorage.setItem('token', token); // Guardamos el token en localStorage
        const success = this.setAuthentication(user, token);
        return success;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  register(email: string, password: string, name: string, surname: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { email, password, name, surname };

    return this.http.post<RegisterResponse>(url, body).pipe(
      map(response => {
        const { user, token } = response;
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.registered);
        localStorage.setItem('token', token);
        return true;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  getCurrentUserId(): string | null {
    return this._currentUser()?._id || null;
  }
}
