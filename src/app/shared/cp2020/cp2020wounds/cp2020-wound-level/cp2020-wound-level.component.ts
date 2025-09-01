import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-cp2020-wound-level',
    templateUrl: './cp2020-wound-level.component.html',
    styleUrls: ['./cp2020-wound-level.component.css'],
    standalone: false
})
export class Cp2020WoundLevelComponent implements OnInit, OnChanges {

  @Input()
  title = '';

  @Input()
  damage = 0;

  @Input()
  stunSaveMod = 0;

  @Output()
  changeDamage = new EventEmitter<number>();

  wounds = new Array<boolean>(4);

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    const dmg = (this.damage < 0 ) ? 0 : this.damage;
    if (dmg > 0 ) {
      this.wounds.fill(true, 0, dmg);
      this.wounds.fill(false, dmg + 1);
    } else {
      this.wounds.fill(false, 0);
    }
  }

  onWound(index: number) {
    this.wounds.fill(true, 0, index);
    this.wounds.fill(false, index + 1);
    const dmg = (Math.abs(this.stunSaveMod) * 4) + this.wounds.filter( v => v).length;
    this.changeDamage.emit(dmg);
  }
}
