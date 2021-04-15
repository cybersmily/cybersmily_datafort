import { DataCyberware } from '../models/data-cyberware';
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
