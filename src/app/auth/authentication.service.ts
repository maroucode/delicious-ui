import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

export interface AuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User>(null);

  singUp(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKj8FQDYK7ZKqITPP-FsuUOWGf32FzFcw',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((resData) => {
          this.handleResponse(resData);
        })
      );
  }
  singIn(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKj8FQDYK7ZKqITPP-FsuUOWGf32FzFcw',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((error) => this.handleError(error)),

        tap((resData) => {
          this.handleResponse(resData);
        })
      );
  }
  signOut() {
    localStorage.setItem('userData',null);
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
  autoSignIn() {
    const loadedUser = localStorage.getItem('userData');
    if (!loadedUser) return;
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(loadedUser);
    const user: User = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    console.log(user);
    if (user.token) {
      console.log(user.token);
      this.user.next(user);
      this.router.navigate(['/recipes']);
    }
  }

  handleResponse(resData: AuthData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/recipes']);
    this.user.next(user);
  }
  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage = 'An error occured';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage = 'This email exists already';
        return throwError(errorMessage);
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'This email is not found';
        return throwError(errorMessage);
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'This is an unvalid password';
        return throwError(errorMessage);
      }
      case 'USER_DISABLED': {
        errorMessage = 'This user is disabled';
        return throwError(errorMessage);
      }
      default:
        return throwError(error.error.error.message);
    }
  }
}
