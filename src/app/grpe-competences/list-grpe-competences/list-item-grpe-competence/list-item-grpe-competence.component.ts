import { Component, Input, OnInit } from '@angular/core';
import { GroupeCompetence } from '../../../models/groupe-competence.models';

@Component({
  selector: 'app-list-item-grpe-competence',
  templateUrl: './list-item-grpe-competence.component.html',
  styleUrls: ['./list-item-grpe-competence.component.css']
})
export class ListItemGrpeCompetenceComponent implements OnInit {
  @Input() grpeCompetence!: GroupeCompetence;
  constructor() { }

  ngOnInit(): void {
  }

}
