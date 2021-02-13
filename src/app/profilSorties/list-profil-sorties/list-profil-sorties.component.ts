import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfilSortiesRequestService } from '../../services/profil-sorties/profil-sorties-request.service';
import { ProfilSortie } from '../../models/profil-sortie.models';

@Component({
  selector: 'app-list-profil-sorties',
  templateUrl: './list-profil-sorties.component.html',
  styleUrls: ['./list-profil-sorties.component.css']
})
export class ListProfilSortiesComponent implements OnInit, OnDestroy {
  profilsSorties: ProfilSortie[] = [];
  profilSortieSubscription !: Subscription;
  isPrevious: boolean = false;
  isNext: boolean = true;
  private currentPage: number = 1;
  constructor(private profilSortiesRequestService: ProfilSortiesRequestService) { }

  ngOnInit(): void {
    this.getProfilSorties(this.currentPage);
  }
  getProfilSorties(currentPage: number){
    this.profilSortieSubscription = this.profilSortiesRequestService.getProfilSorties(currentPage)
        .subscribe(
          success => {
            this.profilsSorties = success;
          }
        );
  }

  first(){

  }

  previous(){

  }
  next(){

  }
  last(){

  }
  ngOnDestroy(): void {
    this.profilSortieSubscription.unsubscribe();
  }
}
