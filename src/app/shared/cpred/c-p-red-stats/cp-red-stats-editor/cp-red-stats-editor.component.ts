import { CpRedStats } from './../../models/cp-red-stats';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp-red-stats-editor',
  templateUrl: './cp-red-stats-editor.component.html',
  styleUrls: ['./cp-red-stats-editor.component.css'],
})
export class CpRedStatsEditorComponent implements OnInit, OnChanges {
  @Input()
  stats: CpRedStats;
  currStats: CpRedStats;

  constructor() {}

  ngOnInit(): void {
    this.currStats = this.stats;
  }

  ngOnChanges(): void {
    this.currStats = this.stats;
  }
}
