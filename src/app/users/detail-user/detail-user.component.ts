import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserRequestService } from './../../services/users/user-request.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit, OnDestroy {
  user !: User;
  userSubscription !: Subscription;
  routeSubscription !: Subscription;
  constructor(private userRequestService: UserRequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.routeSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.getUser(id);
      }
    );
  }
  getUser(id: number){
    this.userSubscription = this.userRequestService.getUser(id)
        .subscribe(
          user => {
            this.user = user;
          }
        );
  }
  getAvatar(){
    if(this.user.avatar){
      return "data:image/jpg;base64"+this.user.avatar;
    }
    return `https://ui-avatars.com/api/?name=${this.user.firstname}+${this.user.lastname}`;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
