import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Referentiel } from '../../models/referentiel.models';
import { ReferentielRequestService } from './../../services/referentiels/referentiel-request.service';

@Component({
  selector: 'app-list-referentiels',
  templateUrl: './list-referentiels.component.html',
  styleUrls: ['./list-referentiels.component.css']
})
export class ListReferentielsComponent implements OnInit, OnDestroy {
  referentiels: Referentiel[] = [];
  private page = 1;
  private nbrePage !: number;
  private referetielsPerPage = 10;
  private referentielsSubscription !: Subscription;
  constructor(private referentielRequestService: ReferentielRequestService) { }
  ngOnInit(): void {
    this.getReferentiels(this.page);
    this.countReferentiels();
  }
  getReferentiels(page:number){
    this.referentielsSubscription = this.referentielRequestService.gets(page)
        .subscribe(
          response => {
            this.referentiels = this.referentiels.concat(response);
          }
        );
  }
  onScroll(){
    if(this.page < this.nbrePage)
    {
      this.page++;
      this.getReferentiels(this.page);
    }
    console.log(this.referentiels.length);

  }

  countReferentiels() {
    this.referentielRequestService.count()
      .subscribe(
        response => {
          const nbreReferentiels = +response;
          this.nbrePage = Math.ceil(nbreReferentiels/this.referetielsPerPage);
        }
      )
  }

  ngOnDestroy(): void {
    this.referentielsSubscription.unsubscribe();
  }
}
