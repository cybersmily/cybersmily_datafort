import { CpRedStat, CpRedCharacterStat } from './../../models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-stat',
  templateUrl: './cp-red-stat.component.html',
  styleUrls: ['./cp-red-stat.component.css'],
})
export class CPRedStatComponent implements OnInit {
  @Input()
  stat: CpRedStat = new CpRedCharacterStat();

  constructor() {}

  ngOnInit(): void {}
}
