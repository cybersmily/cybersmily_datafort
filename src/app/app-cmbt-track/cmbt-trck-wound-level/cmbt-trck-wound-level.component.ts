import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-wound-level',
  templateUrl: './cmbt-trck-wound-level.component.html',
  styleUrls: ['./cmbt-trck-wound-level.component.css']
})
export class CmbtTrckWoundLevelComponent implements OnInit, OnChanges {


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
