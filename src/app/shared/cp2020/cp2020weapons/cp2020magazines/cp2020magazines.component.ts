import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020magazines',
  templateUrl: './cp2020magazines.component.html',
  styleUrls: ['./cp2020magazines.component.css']
})
export class Cp2020magazinesComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  magazines: any;

  @Input()
  shots: number = 0;

  @Input()
  ammo: string = '';

  @Output()
  updateMagazines: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  newMagMultiplier: number =1;
  newMagType: number = 5;
  newMagSubtype: string = '';

  get newMagCost(): number {
    return this.shots * this.newMagMultiplier * this.newMagType;
  }

  constructor() { }

  ngOnInit(): void {
  }

  addMagazine() {
    const mag = {
      ammo: this.ammo,
      used: 0,
      capacity: (this.shots * this.newMagMultiplier),
      cost: this.newMagCost,
      multiplier: this.newMagMultiplier,
      subtype: (this.newMagSubtype != '') ? this.newMagSubtype : undefined
    };
    this.magazines.push(mag);
  }

  delteMagazine(index: number) {
    this.magazines.splice(index, 1);
  }

}
