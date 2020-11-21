import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  singUp(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKj8FQDYK7ZKqITPP-FsuUOWGf32FzFcw',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError((error) => this.handleError(error)));
  }
  singIn(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKj8FQDYK7ZKqITPP-FsuUOWGf32FzFcw',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
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
