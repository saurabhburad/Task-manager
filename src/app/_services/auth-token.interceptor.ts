import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { LoadingService } from './loading-service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this._loading.setLoading(true, request.url);
    if(!request.url.startsWith('https://ds-test-api.herokuapp.com')) {
      request = request.clone({
        setHeaders: {
          'AuthToken': 'pxBc5RB7vBCYQDdQ9Ro7KiOHsWJFDQA3',
        },
      });
    }
    return next.handle(request)
    .pipe(catchError((err) => {
      this._loading.setLoading(false, request.url);
      return err;
    }))
    .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this._loading.setLoading(false, request.url);
      }
      return evt;
    }));
  }
}
