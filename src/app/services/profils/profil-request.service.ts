import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profil } from '../../models/profil.models';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilRequestService {

  constructor(private httpClient: HttpClient) { }

  getProfils(): Observable<Profil[]>{
    return this.httpClient.get<Profil[]>(`${environment.apiURL}/admin/profils?isDeleted=false`);
  }
}
