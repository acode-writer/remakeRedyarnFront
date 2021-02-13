import { LoginService } from './../services/login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HeaderService } from './../services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isConnected = false;
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

}
