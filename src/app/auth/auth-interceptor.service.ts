import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let colnedrequest = req.clone();
        if (!!user) {
          colnedrequest = req.clone({
            params: new HttpParams().set('auth', user.token),
          });
        }
        return next.handle(colnedrequest);
      })
    );
  }
}
