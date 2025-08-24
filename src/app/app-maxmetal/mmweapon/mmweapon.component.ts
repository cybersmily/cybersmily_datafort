import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cs-mmweapon',
    templateUrl: './mmweapon.component.html',
    styleUrls: ['./mmweapon.component.css'],
    standalone: false
})
export class MmweaponComponent implements OnInit {

  @Input()
  item;

  constructor() { }

  ngOnInit() {
  }

}
