import { ChipsComponent } from './../../chips/chips.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Competence } from './../../models/competence.models';
import { CompetenceRequestService } from './../../services/competences/competence-request.service';
import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';
@Component({
  selector: 'app-add-grpe-competence',
  templateUrl: './add-grpe-competence.component.html',
  styleUrls: ['./add-grpe-competence.component.css']
})
export class AddGrpeCompetenceComponent implements OnInit, OnDestroy {
  form !: FormGroup;
  competences : Competence[] = [];
  selectedCompetences : Competence[] = [];
  competencesSubscription !: Subscription;
  @ViewChild('selectpicker') selectpicker!: ElementRef;
  constructor(private fb: FormBuilder, private groupeCompetencesRequestService :GroupeCompetencesRequestService,
      private competenceRequestService: CompetenceRequestService) { }

  ngOnInit(): void {
    this.initForm();
    this.selectpicker.nativeElement.selectpicker();
  }

  getCompetences(libelle: string){
    this.competencesSubscription = this.competenceRequestService.getCompetences(libelle)
        .subscribe(
          response => {
            this.competences = response;
          }
        )
  }

  initForm(){
    this.form = this.fb.group({
      libelle: "",
      descriptif: "",
      libelleCompetence: "",
      competences: this.fb.array([])
    });
  }
  findCompetence(){
    const regex = /\w+(\.+|\s+)/;
    const value = this.form.get('libelleCompetence')?.value;
    const found = value.match(regex);
    if(found){
      this.getCompetences(value);
      const chips = document.querySelector("#chips");

      console.log(this.competences);
    }

  }
  onAdd() {
    const chipsContainer = document.querySelector("#chips");
    const chips = document.createElement('app-chips');
    console.log(chips);

  }
  onCloseChips(id: number){
    console.log(id);
  }
  onSubmit(){
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.competencesSubscription?.unsubscribe();
  }
}
