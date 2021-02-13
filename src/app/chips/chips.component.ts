import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {

  @Input() text !: string;
  @Input() id !: number;
  @Output() close = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onEmitClose(){
    this.close.emit(this.id);
  }

}
