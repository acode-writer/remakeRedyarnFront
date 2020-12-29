import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Referentiel } from './../../Models/referentiel.models';

@Injectable({
  providedIn: 'root'
})
export class ReferentielRequestService {
  referentiels: Referentiel[] = [];
  constructor(private httpClient: HttpClient) { }
  gets(): Observable<Referentiel[]>{
    return this.httpClient.get<Referentiel[]>(`${environment.apiURL}/admin/referentiels`);
  }
}
