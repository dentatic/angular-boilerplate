import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { AuthService } from '@core/service';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.authService.isLoggedIn;
    const token = this.authService.tokenValue;

    const headers: HttpHeaders = request.headers
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    if (isLoggedIn) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return next.handle(request.clone({ headers }));
  }
}
export function provideJwtInterceptor(): Provider {
  return { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
}
