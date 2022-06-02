import { CpRedStats, CpRedCharacterStats } from './../../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-stats',
  templateUrl: './cp-red-character-stats.component.html',
  styleUrls: ['./cp-red-character-stats.component.css'],
})
export class CpRedCharacterStatsComponent implements OnInit {
  @Input()
  stats: CpRedStats = new CpRedCharacterStats();

  @Output()
  updateStats: EventEmitter<CpRedStats> = new EventEmitter<CpRedStats>();

  constructor() {}

  ngOnInit(): void {}
}
