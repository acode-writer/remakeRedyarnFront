import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {
  private stepper : Stepper;
  form = new FormGroup({
    language: new FormControl('',[
      Validators.required
    ]),
    title: new FormControl('',[
      Validators.required
    ]),
    description: new FormControl('',[
      Validators.required
    ]),
    fabrique: new FormControl('',[
      Validators.required
    ]),
    startedAt: new FormControl('',[
      Validators.required,
    ]),
    previsionalEndDate: new FormControl('',[
      Validators.required
    ])
  });
  ngOnInit() {
    const steps = document.querySelector('#stepper1');
    this.stepper = new Stepper(steps, {
      linear: false,
      animation: true
    })
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  onSubmit() {
    return false;
  }

}
