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
  private nbrePages !: number;
  private currentPage = 1;
  numberSubscription !: Subscription;
  constructor(private groupeCompetencesRequestService: GroupeCompetencesRequestService) { }

  ngOnInit(): void {
    this.getGrpe(this.currentPage);
    this.count();
  }
  count() {
    this.numberSubscription = this.groupeCompetencesRequestService.count()
        .subscribe(
          (response) => {
            const nbreGrpeCompetence = +response;
            this.nbrePages = Math.ceil(nbreGrpeCompetence / this.itemPerPage);
          }
        );
  }
  getGrpe(page: number){
    this.grpeCompetencesSubscription = this.groupeCompetencesRequestService.getGroupeCompetences(page)
        .subscribe(
          response => {
            this.grpeCompetences = this.grpeCompetences.concat(response);
          });
  }
  onScroll(){
    if(this.currentPage < this.nbrePages){
      this.currentPage++;
      this.getGrpe(this.currentPage);
    }
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
