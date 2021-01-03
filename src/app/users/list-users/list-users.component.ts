import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.models';
import { UserRequestService } from './../../services/users/user-request.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersSubscription !: Subscription;
  rowPerPage: number = 10;
  number!: number;
  numberOfPages !: number;
  currentPage: number = 0;
  isPrevious : boolean = false;
  isNext : boolean = true;
  constructor(public userService: UserRequestService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers(this.currentPage);
    this.userService.count().subscribe(
      response => {
        this.number = +response['1'];
        this.numberOfPages = Math.round(this.number/this.rowPerPage) ;
      }
    );
  }

  getUsers(currentPage: number){
    this.usersSubscription = this.userService.getUsers(currentPage)
    .subscribe(
      response => {
        this.users = response;
      }
    );
  }
  next(){
    this.currentPage = this.currentPage < this.numberOfPages ? ++this.currentPage : this.numberOfPages;
    console.log(this.currentPage)
    if(this.currentPage < this.numberOfPages){
      this.getUsers(this.currentPage)
      this.isPrevious = true;
    }else{
      this.isNext = false;
    }
  }
  previous(){
    this.currentPage = this.currentPage >= 0 ? --this.currentPage: 0;
    console.log(this.currentPage)

    if(this.currentPage >= 0){
      this.getUsers(this.currentPage);
      this.isNext = true;
    }else{
      this.isPrevious = false;
    }
  }
  last(){
    this.isPrevious = true
    this.getUsers(this.numberOfPages - 1)
    this.isNext = false;
  }
  first(){
    this.isPrevious = false;
    this.isNext = true;
    this.getUsers(0);
  }
  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
