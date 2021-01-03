import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Competence } from '../../models/competence.models';
import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';
import { GroupeCompetence } from '../../models/groupe-competence.models';
import { Niveau } from '../../models/niveau.models';

@Component({
  selector: 'app-list-competences',
  templateUrl: './list-competences.component.html',
  styleUrls: ['./list-competences.component.css']
})
export class ListCompetencesComponent implements OnInit, OnDestroy {
  groupeCompetences : GroupeCompetence[] = [];
  competences : Competence[] = [];
  groupeCompetencesSubscription!: Subscription;
  niveaux: Niveau[] = [];
  form = new FormGroup({
    select: new FormControl()
  });
  constructor(private groupeCompetencesRequestService: GroupeCompetencesRequestService) { }

  ngOnInit(): void {
    this.groupeCompetencesSubscription = this.groupeCompetencesRequestService.getGroupeCompetences()
        .subscribe(
          response => {
            this.groupeCompetences = response;
          }
        );
  }

  setCompetence(){
    const selectedGroupeCompetence = +this.form.value.select
    if(selectedGroupeCompetence){
      const grpeCompetence = this.findGroupeCompetence(selectedGroupeCompetence);
      this.competences = grpeCompetence == null ? [] : grpeCompetence.competences;
    }
  }
  getLevels(id: number) {
    const competence = this.findCompetence(id);
    this.niveaux = competence == null ? [] : competence.niveaux;
    console.log(this.niveaux);

  }
  findCompetence(id: number){
    const competence = this.competences.find((skill: Competence) => {
      return skill.id === id;
    });
    return competence;
  }
  findGroupeCompetence(id: number){
    const grpeCompetence = this.groupeCompetences.find((skillGroup: GroupeCompetence) => {
      return skillGroup.id === id;
    });
    return grpeCompetence;
  }

  ngOnDestroy(): void {
    this.groupeCompetencesSubscription.unsubscribe();
  }
}
