import { CPRedLifePathCore } from './../models/c-p-red-life-path-core';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cs-cp-red-lifepath-core',
    templateUrl: './cp-red-lifepath-core.component.html',
    styleUrls: ['./cp-red-lifepath-core.component.css'],
    standalone: false
})
export class CpRedLifepathCoreComponent implements OnInit {

  @Input()
  coreLifePath: CPRedLifePathCore = new CPRedLifePathCore();

  constructor() { }

  ngOnInit(): void {
  }

}
