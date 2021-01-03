import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './../services/login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpiredGuardService implements CanActivate  {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(environment.tokenName);
    if(token){
      let isExpired = helper.isTokenExpired(token);
      if(!isExpired){
        this.loginService._isExpired = false;
        return true;
      }
    }
    return this.router.navigate(['/unauthorized']);
  }
}
