import { DataCyberware } from './../../../cp2020/cp2020-cyberware/models';
import { Component, OnInit, Input } from '@angular/core';

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
