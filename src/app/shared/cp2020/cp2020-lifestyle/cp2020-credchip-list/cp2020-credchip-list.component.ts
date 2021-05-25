import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cp2020Credchip } from '../models';

@Component({
  selector: 'cs-cp2020-credchip-list',
  templateUrl: './cp2020-credchip-list.component.html',
  styleUrls: ['./cp2020-credchip-list.component.css']
})
export class Cp2020CredchipListComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  credchips: Array<Cp2020Credchip> = new Array<Cp2020Credchip>();

  @Output()
  updateCredchips: EventEmitter<Array<Cp2020Credchip>> = new EventEmitter<Array<Cp2020Credchip>>();

  currCredchips: Array<Cp2020Credchip> = new Array<Cp2020Credchip>();

  get totalValue(): number {
    return this.currCredchips.reduce( (a, b) => a + b.amount, 0);
  }

  constructor() { }

  ngOnInit(): void {
    this.currCredchips = this.credchips.slice(0);
  }

  update() {
    this.updateCredchips.emit(this.currCredchips);
  }

  add() {
    this.currCredchips.push({
      name: '',
      amount: 0,
      writeable: true
    });
    this.update();
  }

  delete(index: number) {
    this.currCredchips.splice(index, 1);
    this.update();
  }

}