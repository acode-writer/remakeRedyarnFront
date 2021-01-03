import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { User } from '../../models/user.models';
@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  constructor(private httpClient: HttpClient) { }

  getUsers(page: number = 0): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.apiURL}/admin/users?isDeleted=false&page=${page + 1}`);
  }

  getUser(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/admin/users/` + id);
  }

  add(user: FormData): Observable<any>{
    return this.httpClient
      .post(`${environment.apiURL}/admin/users`, user);
  }
  count(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/admin/users/count`);
  }
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiURL}/admin/users/${id}`);
  }

  put(id: number, data: FormData): Observable<any> {
    return  this.httpClient.post(`${environment.apiURL}/admin/users/${id}`, data);
  }
}
