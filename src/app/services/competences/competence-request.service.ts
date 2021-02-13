import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Competence } from './../../models/competence.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetenceRequestService {

  constructor(private httpClient: HttpClient) { }

  add(competence: Competence): Observable<Competence> {
    return this.httpClient.post<Competence>(`${environment.apiURL}/admin/competences`,competence);
  }
  put(id:number,competence: Competence){
    return this.httpClient.put<Competence>(`${environment.apiURL}/admin/competences/${id}`,competence);
  }
  getCompetences(libelle: string | null = null): Observable<Competence[]> {
    if(libelle){
      return this.httpClient.get<Competence[]>(`${environment.apiURL}/admin/competences?libelle=${libelle}`);
    }else{
      return this.httpClient.get<Competence[]>(`${environment.apiURL}/admin/competences`);
    }
  }
  getCompetence(id:number): Observable<Competence> {
    return this.httpClient.get<Competence>(`${environment.apiURL}/admin/competences/${id}`);
  }
}
