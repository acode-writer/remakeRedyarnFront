import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

export class RequestsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(environment.tokenName);
    if (token){
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)});
      req = req.clone({headers: req.headers.set('Accept', 'application/json')});
      return next.handle(req);
    }
    return next.handle(req);
  }
}

export const RequestsInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestsInterceptor,
  multi: true
};
