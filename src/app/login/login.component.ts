import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  get _loginForm(): FormGroup {
    return this.loginForm;
  }

  get _loginService(): LoginService {
    return this.loginService;
  }

  get username(): any {
    return this.loginForm.get('username');
  }
  get password(): unknown {
    return this.loginForm.get('password');
  }

  onLogin(): any {
    if(this.loginForm.valid){
      const credentiels = this.loginForm.value;
      return this.loginService.login(credentiels)
          .subscribe(
            response => {
              const token = response.token;
              localStorage.setItem(environment.tokenName,token);
              return this.router.navigate(['/admin/users']);
            }
          );
    }
  }
}
