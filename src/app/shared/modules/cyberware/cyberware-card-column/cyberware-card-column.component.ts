import { DataCyberware } from './../../../cp2020/cp2020-cyberware/models/data-cyberware';
import { CyberwareCardComponent } from './../cyberware-card/cyberware-card.component';
import { Component, OnInit, Input } from '@angular/core';

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
