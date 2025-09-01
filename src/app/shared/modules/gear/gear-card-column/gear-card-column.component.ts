import { GearCardComponent } from './../gear-card/gear-card.component';
import { Component, OnInit, Input } from '@angular/core';
import { Gear } from '../../../models/gear';

@Component({
    selector: 'cs-gearcardcolumn',
    templateUrl: './gear-card-column.component.html',
    styleUrls: ['./gear-card-column.component.css'],
    standalone: false
})
export class GearCardColumnComponent implements OnInit {

  @Input()
  gearList: Gear[] = new Array<Gear>();

  constructor() { }

  ngOnInit() {
  }
}
