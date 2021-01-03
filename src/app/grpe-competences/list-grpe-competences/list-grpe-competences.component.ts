import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupeCompetence } from '../../models/groupe-competence.models';
import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';

@Component({
  selector: 'app-list-grpe-competences',
  templateUrl: './list-grpe-competences.component.html',
  styleUrls: ['./list-grpe-competences.component.css']
})
export class ListGrpeCompetencesComponent implements OnInit, OnDestroy {
  grpeCompetences: GroupeCompetence[] = [];
  grpeCompetencesSubscription !: Subscription;
  private itemPerPage: number = 10;
  private currentPage: number = 1;
  private pages !: number;
  number !: number;
  numberSubscription !: Subscription;
  height !: number;
  x !: number;
  constructor(private groupeCompetencesRequestService: GroupeCompetencesRequestService) { }

  ngOnInit(): void {
    this.getGrpe();
    this.count();
    this.scroll()
  }
  scroll(){
    window.addEventListener("scroll",this.scrollEvent);
  }
  count() {
    this.numberSubscription = this.groupeCompetencesRequestService.count()
        .subscribe(
          response => {
            this.number = +response["1"];
            this.pages = Math.round(this.number / this.itemPerPage);
          }
        );
  }
  getGrpe(){
    this.grpeCompetencesSubscription = this.groupeCompetencesRequestService.getGroupeCompetences()
        .subscribe(
          response => {
            this.grpeCompetences = response;
          });
  }
  scrollEvent(){
    const scrollheight = document.body.offsetHeight;
    const scrollY = window.scrollY
  }
  ngOnDestroy(): void {
    this.grpeCompetencesSubscription.unsubscribe();
    window.removeEventListener("scroll",this.scrollEvent);
  }
}
