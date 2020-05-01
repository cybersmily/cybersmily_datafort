import { Component, OnInit, Input } from '@angular/core';
import { Gear } from '../../../models/gear';

@Component({
  selector: 'cs-gear-card',
  templateUrl: './gear-card.component.html',
  styleUrls: ['./gear-card.component.css']
})
export class GearCardComponent implements OnInit {

  @Input()
  gear: Gear;

  constructor() { }

  ngOnInit() {
  }

}
