import { CpRedStatsManagerService } from './../../services/cp-red-stats-manager/cp-red-stats-manager.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'cs-cp-red-stats-editor',
  templateUrl: './cp-red-stats-editor.component.html',
  styleUrls: ['./cp-red-stats-editor.component.css'],
})
export class CpRedStatsEditorComponent implements OnInit {
  constructor(private statManager: CpRedStatsManagerService) {}

  ngOnInit(): void {}

  get statTotal(): Observable<number> {
    return this.statManager.getTotalStatPoints();
  }

  get statNames(): Observable<Array<string>> {
    return this.statManager.characterStats.pipe(
      map((stats) => Object.keys(stats))
    );
  }
}
