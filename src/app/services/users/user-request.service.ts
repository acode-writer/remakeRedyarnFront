import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { User } from './../../Models/user.models';
@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.apiURL}/admin/users`);
  }
}
