import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Referentiel } from './../../Models/referentiel.models';
import { ReferentielRequestService } from './../../services/referentiels/referentiel-request.service';

@Component({
  selector: 'app-list-referentiels',
  templateUrl: './list-referentiels.component.html',
  styleUrls: ['./list-referentiels.component.css']
})
export class ListReferentielsComponent implements OnInit, OnDestroy {
  referentiels: Referentiel[] = [];
  private referentielsSubscription !: Subscription;
  constructor(private referentielRequestService: ReferentielRequestService) { }
  ngOnInit(): void {
    this.referentielsSubscription = this.referentielRequestService.gets()
        .subscribe(
          response => {
            this.referentiels = response;
          }
        );
  }
  ngOnDestroy(): void {
    this.referentielsSubscription.unsubscribe();
  }
}
