import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CpRedDate } from './../models';
import { CpRedDateGeneratorService } from './../services';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { CpRedDatingMainChart } from './../models';
import { CpRedAppFiles } from './../../shared/services/file-services/enum/cpred-app-files';
import { DataService, JsonDataFiles } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';
import { CpRedLifepathCoreRoleChartEntry } from './../../shared/cpred/c-p-red-lifepath/models';

@Component({
  selector: 'cs-cp-red-dating-form',
  templateUrl: './cp-red-dating-form.component.html',
  styleUrls: ['./cp-red-dating-form.component.css']
})
export class CpRedDatingFormComponent implements OnInit {
  faDice = faDice;

  redDate$: Observable<CpRedDate>;
  isGhosted(outcome: string): boolean {
    return outcome === 'You were ghosted.' ?? false;
  }

  constructor(
            private dateGeneratorService: CpRedDateGeneratorService,
            private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Dating Utility for Cyberpunk Red',
      '2022-03, Cybersmily\'s Datafort Dating utility for Cyberpunk Red using the DLC from RTG.'
    );
    this.redDate$ = this.dateGeneratorService.currentDate;
  }

  rollDate(): void {
    this.dateGeneratorService.generate();
  }

}
