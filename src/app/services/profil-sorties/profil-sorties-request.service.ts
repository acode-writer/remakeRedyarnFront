import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfilSortie } from 'src/app/models/profil-sortie.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilSortiesRequestService {

  constructor(private httpClient: HttpClient) { }

  getProfilSorties(current: number): Observable<ProfilSortie[]>{
    return this.httpClient.get<ProfilSortie[]>(`${environment.apiURL}/admin/profilsorties?isDeleted=false&page=${current}`);
  }
}
