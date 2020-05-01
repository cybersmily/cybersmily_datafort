import { Component, OnInit, Input } from '@angular/core';
import { DataCyberware } from './../../../models/cyberware';

@Component({
  selector: 'cs-cyberware-card',
  templateUrl: './cyberware-card.component.html',
  styleUrls: ['./cyberware-card.component.css']
})
export class CyberwareCardComponent implements OnInit {

  @Input()
  cyberware: DataCyberware;

  constructor() { }

  ngOnInit() {
  }

}
