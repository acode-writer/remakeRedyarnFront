import { Referentiel } from './../../../Models/referentiel.models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-referentiel',
  templateUrl: './list-item-referentiel.component.html',
  styleUrls: ['./list-item-referentiel.component.css']
})
export class ListItemReferentielComponent implements OnInit {
  @Input() referentiel !: Referentiel;
  constructor() { }

  ngOnInit(): void {
  }

}
