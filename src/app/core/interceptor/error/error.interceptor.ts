import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable, Provider } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(({ status, error }) => {
      if (status === 401) {
        //Handel Unauthorized 401
      }

      //Here you can log error or show toast

      return throwError(() => error)
    }));
  }
}
export function provideErrorInterceptor(): Provider {
  return { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
}
