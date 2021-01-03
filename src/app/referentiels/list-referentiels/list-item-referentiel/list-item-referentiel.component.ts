import { Component, Input, OnInit } from '@angular/core';
import { Referentiel } from 'src/app/models/referentiel.models';

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
