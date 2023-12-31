import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { Injectable, Provider } from '@angular/core';
import { LoaderService } from '@core/service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  totalRequest: number = 0
  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequest++;
    this.loaderService.setLoader(true)
    return next.handle(request).pipe(finalize(() => {
      this.totalRequest--;
      if (this.totalRequest === 0) this.loaderService.setLoader(false)
    }));
  }
}
export function provideLoaderInterceptor(): Provider {
  return { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
}
