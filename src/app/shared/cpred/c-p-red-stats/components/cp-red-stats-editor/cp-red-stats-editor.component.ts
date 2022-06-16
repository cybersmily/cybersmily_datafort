import { CpRedStats, CpRedStat } from './../../models';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'cs-cp-red-stats-editor',
  templateUrl: './cp-red-stats-editor.component.html',
  styleUrls: ['./cp-red-stats-editor.component.css'],
})
export class CpRedStatsEditorComponent implements OnInit, OnChanges {
  @Input()
  stats: CpRedStats;
  currStats: CpRedStats;

  @Output()
  changeStats: EventEmitter<CpRedStats> = new EventEmitter<CpRedStats>();

  constructor() {}

  ngOnInit(): void {
    this.currStats = { ...this.stats };
  }

  ngOnChanges(): void {
    this.currStats = { ...this.stats };
  }

  updateStat(stat: CpRedStat) {
    this.currStats[stat.name] = stat;
    this.changeStats.emit(this.currStats);
  }
}
