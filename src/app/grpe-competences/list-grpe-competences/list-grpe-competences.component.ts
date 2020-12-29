import { Component, OnInit } from '@angular/core';
import { GroupeCompetence } from './../../Models/groupe-competence.models';
import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';

@Component({
  selector: 'app-list-grpe-competences',
  templateUrl: './list-grpe-competences.component.html',
  styleUrls: ['./list-grpe-competences.component.css']
})
export class ListGrpeCompetencesComponent implements OnInit {
  grpeCompetences: GroupeCompetence[] = [];
  constructor(private groupeCompetencesRequestService: GroupeCompetencesRequestService) { }

  ngOnInit(): void {
    this.groupeCompetencesRequestService.getGroupeCompetences()
        .subscribe(
          response => {
            this.grpeCompetences = response;
          }
        )
  }

}
