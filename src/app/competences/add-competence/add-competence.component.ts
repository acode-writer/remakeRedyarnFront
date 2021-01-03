import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';
import { GroupeCompetence } from 'src/app/models/groupe-competence.models';
import { CompetenceRequestService } from './../../services/competences/competence-request.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css']
})
export class AddCompetenceComponent implements OnInit, OnDestroy {
  form !: FormGroup;
  addSubscription : Subscription|null = null;
  grpeCompetences : GroupeCompetence[] = [];
  grpeCompetencesSubscription !: Subscription;
  constructor(private fb: FormBuilder, private competenceRequestService: CompetenceRequestService,
              private groupCompetenceRequestService: GroupeCompetencesRequestService) { }

  ngOnInit(): void {
    this.initForm();
    this.getGrpeCompetences();
  }
  initForm() {
    this.form = this.fb.group({
      libelle: ["", Validators.required],
      groupeCompetences: ["", Validators.required],
      niveaux: this.fb.array([this.addNiveaux(1), this.addNiveaux(2), this.addNiveaux(3)])
    });
  }
  getGrpeCompetences(){
    this.grpeCompetencesSubscription = this.groupCompetenceRequestService.getGroupeCompetences()
            .subscribe(
              response => {
                this.grpeCompetences = response;
              }
            );
  }
   addNiveaux(libelle: number): FormGroup {
    return this.fb.group({
      libelle: `Niveau ${libelle}`,
      critereEvaluation: ["", Validators.required],
      groupeAction: ["", Validators.required]
    })
  }
  get niveaux(): FormArray {
    return this.form.get('niveaux') as FormArray
  }
  selectedGroupe(){
    const idGroupeCompetence =  +this.form.value.groupeCompetences;
    const selectedGroupeCompetence =  this.findGrpComById(idGroupeCompetence);
    this.form.get('groupeCompetences')?.setValue([selectedGroupeCompetence]);
  }

  onSubmit(){
    if(this.form.valid){
      const competencte = this.form.value;
      this.addSubscription = this.competenceRequestService.add(competencte)
          .subscribe(
            response => {
              console.log(response);
            }
          );
    }
  }
  findGrpComById(id:number){
    return this.grpeCompetences.find((item: GroupeCompetence) => item.id === id);
  }
  ngOnDestroy(){
    if(this.addSubscription){
      this.addSubscription.unsubscribe();
    }
    this.grpeCompetencesSubscription.unsubscribe();
  }
}
