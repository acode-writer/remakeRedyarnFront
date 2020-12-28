import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HeaderService } from './../header/header.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private decodedToken: any;
  private isExpired;
  constructor(private httpClient: HttpClient,private headerService: HeaderService) {
    const token = localStorage.getItem(environment.tokenName);
    if(token){
      const helper = new JwtHelperService();
      this.decodedToken = helper.decodeToken(token);
      this.isExpired = helper.isTokenExpired(token);
      this.headerService.role = this.decodedToken.roles[0];
    }

  }

  login(credentiels: unknown): Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/login_check`,credentiels);
  }

  getEmailErrorMessage(username: FormControl): string {
    if (username.hasError('required')) {
      return 'You must enter a value';
    }
    return username.hasError('email') ? 'Not a valid email' : '';
  }

  get _decodedToken() {
    return this.decodedToken;
  }
  get _isExpired() {
    return this.isExpired;
  }

}
