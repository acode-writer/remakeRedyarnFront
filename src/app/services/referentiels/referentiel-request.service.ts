import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Referentiel } from '../../models/referentiel.models';

@Injectable({
  providedIn: 'root'
})
export class ReferentielRequestService {
  referentiels: Referentiel[] = [];
  constructor(private httpClient: HttpClient) { }
  gets(page:number): Observable<Referentiel[]>{
    return this.httpClient.get<Referentiel[]>(`${environment.apiURL}/admin/referentiels?page=${page}`);
  }
  count(): Observable<string>{
    return this.httpClient.get<string>(`${environment.apiURL}/admin/referentiels/count`);
  }
}
