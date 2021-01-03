import { LoginService } from './../services/login/login.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


export class RequestsInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    const token = localStorage.getItem(environment.tokenName);
      if (token){
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token);
        if(!isExpired){
          req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)});
          req = req.clone({headers: req.headers.set('Accept', 'application/json')});
          return next.handle(req);
        }
      }
      return next.handle(req);
  }
}

export const RequestsInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestsInterceptor,
  multi: true,
  deps: [Router,LoginService]
};
