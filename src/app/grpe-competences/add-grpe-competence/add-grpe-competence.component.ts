import { ChipsComponent } from './../../chips/chips.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Competence } from './../../models/competence.models';
import { CompetenceRequestService } from './../../services/competences/competence-request.service';
import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GroupeCompetence } from 'src/app/models/groupe-competence.models';
@Component({
  selector: 'app-add-grpe-competence',
  templateUrl: './add-grpe-competence.component.html',
  styleUrls: ['./add-grpe-competence.component.css']
})
export class AddGrpeCompetenceComponent implements OnInit, OnDestroy {
  form !: FormGroup;
  competencesList : Competence[] = [];
  competencesSubscription !: Subscription;
  groupeCompetencesSubscription !: Subscription;
  clicked : boolean = false;
  // @ViewChild('selectpicker') selectpicker !: ElementRef;
  selectedItems = [];
  dropdownSettings : IDropdownSettings  = {};

  constructor(private fb: FormBuilder, private groupeCompetencesRequestService :GroupeCompetencesRequestService,
      private competenceRequestService: CompetenceRequestService) { }

  ngOnInit(): void {
    this.initForm();
    // this.selectpicker?.nativeElement.selectpicker();
    this.getCompetences();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }

  getCompetences(){
    this.competencesSubscription = this.competenceRequestService.getCompetences()
        .subscribe(
          (response: Competence[]) => {
            this.competencesList = response;
          }
        );
  }

  initForm(){
    this.form = this.fb.group({
      libelle: ["", Validators.required],
      descriptif: ["", Validators.required],
      competences: this.selectedItems
    });
  }
  get competences(): FormArray {
    return this.form.get("competences") as FormArray;
  }
  onAddCompetence(event:any){
    let competences = this.competences.value;
    if(competences){
      competences.push(event);
    }else{
      competences = [];
      competences.push(event);
    }
    this.competences.setValue(competences);
    this.selectedItems.push(<never>competences);
    this.clicked = false;
  }
  onClick(){
    this.clicked = true;
  }
  onClose(){
    this.clicked = false;
  }
  onSubmit(){
    if(this.form.valid){
      const skillGroup = this.form.value;
      this.groupeCompetencesSubscription = this.groupeCompetencesRequestService.add(skillGroup)
          .subscribe(
            (response: GroupeCompetence) => {
              console.log(response);
            }
          );
    }
  }
  onItemSelect(item: any) {
    let competences = this.competences.value;
    if(competences){
      competences.push(item);
    }else{
      competences = [];
      competences.push(item);
    }
    this.form.get("competences")?.setValue(competences);
  }
  onSelectAll(items: any) {
    this.form.get("competences")?.setValue(items);
  }
  onItemDeselect(item: any) {
    let competences = this.competences.value;
    let selected = competences.filter((competence: Competence) => competence.id !== item.id);
    this.competences.setValue(selected);
  }
  onDeselectAll(items: any) {
    this.form.get("competences")?.setValue([]);
  }
  ngOnDestroy(): void {
    this.competencesSubscription?.unsubscribe();
  }
}
