import { CyberwareCardComponent } from './../cyberware-card/cyberware-card.component';
import { Component, OnInit, Input } from '@angular/core';
import { DataCyberware } from './../../../models/cyberware';

@Component({
  selector: 'cs-cyberwarecardcolumn',
  templateUrl: './cyberware-card-column.component.html',
  styleUrls: ['./cyberware-card-column.component.css']
})
export class CyberwareCardColumnComponent implements OnInit {

  @Input()
  cyberList: DataCyberware[];

  constructor() {}

  ngOnInit() {}
}
