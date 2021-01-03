import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfilRequestService } from './../../services/profils/profil-request.service';
import { Profil } from '../../models/profil.models';

@Component({
  selector: 'app-list-profils',
  templateUrl: './list-profils.component.html',
  styleUrls: ['./list-profils.component.css']
})
export class ListProfilsComponent implements OnInit, OnDestroy {
  profils: Profil[] = [];
  private profilsSubscription !: Subscription;
  constructor(private profilsRequestService: ProfilRequestService) { }

  ngOnInit(): void {
    this.profilsSubscription = this.profilsRequestService.getProfils()
        .subscribe(
          success => {
            this.profils = success;
          }
        );
  }

  ngOnDestroy(): void {
    this.profilsSubscription.unsubscribe();
  }
}
