import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface AuthData
{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}


@Injectable()
export class AuthenticationService
{

  constructor(private http: HttpClient) { }

  singUp(email: string, password: string)
  {
    return this.http.post<AuthData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKj8FQDYK7ZKqITPP-FsuUOWGf32FzFcw", { email: email, password: password, returnSecureToken: true });
  }
  singIn(email: string, password: string)
  {
    return this.http.post<AuthData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKj8FQDYK7ZKqITPP-FsuUOWGf32FzFcw", { email: email, password: password, returnSecureToken: true });
  }
}
