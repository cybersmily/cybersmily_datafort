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

  chart: CpRedDatingMainChart;

  redDate: CpRedDate;
  isGhosted = false;
  roleCharts: Array<CpRedLifepathCoreRoleChartEntry>;

  get rollDisabled(): boolean {
    return (this.chart && this.roleCharts.length > 0);
  }

  constructor(private dataService: DataService,
            private dateGeneratorService: CpRedDateGeneratorService,
            private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Dating Utility for Cyberpunk Red',
      '2022-03, Cybersmily\'s Datafort Dating utility for Cyberpunk Red using the DLC from RTG.'
    );
    this.dataService.GetJson(CpRedAppFiles.DATING_CHARTS)
    .subscribe((data) => {
      this.chart = data.cpred;
    });
    this.dataService.GetJson(JsonDataFiles.CPRED_LIFEPATH_CHART_JSON)
    .subscribe( data => {
      this.roleCharts = data?.corebook?.roles;
    });
  }

  rollDate(): void {
    if(this.chart) {
      this.redDate = this.dateGeneratorService.generateDate(this.chart, this.roleCharts);
      this.isGhosted = this.redDate?.outcome === 'You were ghosted.' ?? false;
    }
  }

}
