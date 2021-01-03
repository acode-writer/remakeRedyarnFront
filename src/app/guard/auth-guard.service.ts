import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | any {

    const role = this.loginService._decodedToken ? this.loginService._decodedToken.roles[0] : null;
    if(role === 'ROLE_ADMIN'){
      return true;
    }else{
      this.router.navigate(['/unauthorized']);
    }
  }
}
