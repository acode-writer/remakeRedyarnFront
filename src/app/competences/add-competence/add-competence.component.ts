import { Competence } from './../../models/competence.models';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupeCompetencesRequestService } from './../../services/groupe-competences/groupe-competences-request.service';
import { GroupeCompetence } from 'src/app/models/groupe-competence.models';
import { CompetenceRequestService } from './../../services/competences/competence-request.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
  id !: number;
  competence !: Competence;
  @Input() fromGrpComp !:boolean;
  @Output() createdSkillEmitter  = new EventEmitter<any>();
  private routeSubscription !: Subscription;
  private competenceSubscription !: Subscription;
  constructor(private fb: FormBuilder, private competenceRequestService: CompetenceRequestService,
              private groupCompetenceRequestService: GroupeCompetencesRequestService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.fromGrpComp);

  }
  initializeForm(): void {
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        if(this.id){
          this.competenceSubscription = this.competenceRequestService.getCompetence(this.id)
            .subscribe(
              (response: Competence) => {
                this.competence = response;
                this.libelle?.setValue(this.competence.libelle);
                this.form.get("groupeCompetences")?.setValue(this.competence.groupeCompetences);
                const len = this.competence.niveaux.length;
                if(len){
                  this.niveaux.setValue([response.niveaux[0],response.niveaux[1],response.niveaux[2]]);
                }
              }
            );
          this.initAddForm();
        }else{
          if(this.fromGrpComp){
            this.initUpdateForm();
          }else{
            this.initAddForm();
            this.getGrpeCompetences();
          }
        }
      }
    );
  }
  initAddForm() {
    this.form = this.fb.group({
      libelle: ["", Validators.required],
      groupeCompetences: ["", Validators.required],
      niveaux: this.fb.array([this.addNiveaux(1), this.addNiveaux(2), this.addNiveaux(3)])
    });
  }
  initUpdateForm() {
    this.form = this.fb.group({
      libelle: ["", Validators.required],
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
      id: [''],
      critereEvaluation: ["", [Validators.required]],
      groupeAction: ["", [Validators.required]]
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
      if(this.fromGrpComp){
        const competence: any = {
          libelle: this.libelle?.value,
          groupeCompetences: [],
          niveveaux: this.niveaux.value
        };
        this.createdSkillEmitter.emit(competence);
      }
      else{
        const competencte = this.form.value;
        if(this.id){
          this.addSubscription = this.competenceRequestService.put(this.id,competencte)
              .subscribe(
                (response:unknown) => {
                  // const url = new URL('http://localhost:3000/hub');
                  // url.searchParams.append('topic', 'http://example.com/books/'+this.id);
                  // const eventSource = new EventSource(url);
                  // eventSource.onmessage = event => {
                  //     console.log(JSON.parse(event.data));
                  // }
                }
              );
        }else {
          this.addSubscription = this.competenceRequestService.add(competencte)
              .subscribe(
                response => {
                  console.log(response);
                }
              );
        }
      }
    }
  }
  findGrpComById(id:number){
    return this.grpeCompetences.find((item: GroupeCompetence) => item.id === id);
  }
  get libelle() { return this.form.get("libelle"); }

  ngOnDestroy(){
    if(this.addSubscription){
      this.addSubscription.unsubscribe();
    }
    if(this.competenceSubscription){
      this.competenceSubscription.unsubscribe();
    }
    if(this.grpeCompetencesSubscription){
      this.grpeCompetencesSubscription.unsubscribe();
    }
    this.routeSubscription.unsubscribe();
  }
}
