import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { GroupeCompetence } from './../../Models/groupe-competence.models';

@Injectable({
  providedIn: 'root'
})
export class GroupeCompetencesRequestService {

  constructor(private httpClient: HttpClient) { }
  getGroupeCompetences(): Observable<GroupeCompetence[]>{
    return this.httpClient.get<GroupeCompetence[]>(`${environment.apiURL}/admin/grpecompetences?page=2`);
  }
}
