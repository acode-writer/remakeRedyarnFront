import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './../../Models/user.models';
import { UserRequestService } from './../../services/users/user-request.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersSubscription !: Subscription;
  constructor(public userService: UserRequestService) {
   }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.usersSubscription = this.userService.getUsers()
    .subscribe(
      response => {
        this.users = response;
      }
    );
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
