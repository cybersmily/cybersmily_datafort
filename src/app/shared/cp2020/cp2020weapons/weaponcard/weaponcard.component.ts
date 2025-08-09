import { CpWeapon } from '../models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cs-weaponcard',
    templateUrl: './weaponcard.component.html',
    styleUrls: ['./weaponcard.component.css'],
    standalone: false
})
export class WeaponcardComponent implements OnInit {

  @Input()
  wpn: CpWeapon;

  constructor() { }

  ngOnInit() {
  }

}
