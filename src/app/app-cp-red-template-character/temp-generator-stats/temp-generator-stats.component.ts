import { Component, OnInit, Input } from '@angular/core';
import { CpRedBaseStats } from './../../shared/cpred/models/cp-red-base-stats';

@Component({
    selector: 'cs-temp-generator-stats',
    templateUrl: './temp-generator-stats.component.html',
    styleUrls: ['./temp-generator-stats.component.css'],
    standalone: false
})
export class TempGeneratorStatsComponent implements OnInit {
  @Input()
  stats: CpRedBaseStats = new CpRedBaseStats();

  @Input()
  role: string = '';

  @Input()
  name: string = '';

  constructor() { }

  ngOnInit() {
  }

}
