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
  private isExpired !: boolean;
  private helper = new JwtHelperService();
  private token : string|null;
  constructor(private httpClient: HttpClient,private headerService: HeaderService) {
    this.token = localStorage.getItem(environment.tokenName);
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
    if(this.token){
      return this.helper.decodeToken(this.token);
    }
    return null;
  }
  get _isExpired() {
    if(this.token){
      return this.helper.isTokenExpired(this.token);
    }
    return true;
  }

  set _isExpired(value: boolean){
    this.isExpired = value;
  }

}
