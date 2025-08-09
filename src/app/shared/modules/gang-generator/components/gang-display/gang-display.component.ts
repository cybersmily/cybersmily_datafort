import { CpGang } from './../../models/cp-gang';
import { Gang } from './../../models/gang';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cs-gang-display',
    templateUrl: './gang-display.component.html',
    styleUrls: ['./gang-display.component.css'],
    standalone: false
})
export class GangDisplayComponent implements OnInit {
  @Input()
  gang: CpGang;

  constructor() {}

  ngOnInit(): void {}
}
