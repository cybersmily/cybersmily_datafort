import { CpRedStatsManagerService } from './../../services/cp-red-stats-manager/cp-red-stats-manager.service';
import { Observable, map } from 'rxjs';
import { CpRedStat, CpRedCharacterStat } from './../../models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cs-cp-red-stat',
    templateUrl: './cp-red-stat.component.html',
    styleUrls: ['./cp-red-stat.component.css'],
    standalone: false
})
export class CPRedStatComponent implements OnInit {
  @Input()
  statName: string = '';

  get stat(): Observable<CpRedCharacterStat> {
    return this.statsManager.characterStats.pipe(
      map((stats) => {
        if (stats[this.statName]) {
          return stats[this.statName];
        }
        return new CpRedCharacterStat();
      })
    );
  }

  constructor(private statsManager: CpRedStatsManagerService) {}

  ngOnInit(): void {}
}
