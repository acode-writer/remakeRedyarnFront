import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupeCompetence } from 'src/app/models/groupe-competence.models';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupeCompetencesRequestService {

  constructor(private httpClient: HttpClient) { }
  add(groupeCometence:GroupeCompetence): Observable<GroupeCompetence> {
    return this.httpClient.post<GroupeCompetence>(`${environment.apiURL}/admin/grpecompetences`,groupeCometence);
  }
  getGroupeCompetences(currentPage: number = 1): Observable<GroupeCompetence[]>{
    return this.httpClient.get<GroupeCompetence[]>(`${environment.apiURL}/admin/grpecompetences?page=${currentPage}`);
  }

  count(){
    return this.httpClient.get(`${environment.apiURL}/admin/grpecompetences/count`)
  }
}
