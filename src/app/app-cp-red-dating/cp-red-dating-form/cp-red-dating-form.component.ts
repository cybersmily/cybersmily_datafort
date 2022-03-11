import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { CPRedLifePathService } from './../../shared/cpred/c-p-red-lifepath/services/c-p-red-life-path.service';
import { CpRedDate } from './../models/cp-red-date';
import { CpRedDateGeneratorService } from './../services/cp-red-date-generator/cp-red-date-generator.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { CpRedDatingMainChart } from './../models/cp-red-dating-main-chart';
import { CpRedAppFiles } from './../../shared/services/file-services/enum/cpred-app-files';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
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
  rollDisabled = true;
  isGhosted = false;
  roleCharts: Array<CpRedLifepathCoreRoleChartEntry> = new Array<CpRedLifepathCoreRoleChartEntry>();

  constructor(private dataService: DataService,
            private dateGeneratorService: CpRedDateGeneratorService) { }

  ngOnInit(): void {
    this.dataService.GetJson(CpRedAppFiles.DATING_CHARTS)
    .subscribe((data) => {
      this.chart = data.cpred;
      this.rollDisabled = false;this.dataService.GetJson(JsonDataFiles.CPRED_LIFEPATH_CHART_JSON)
      .subscribe( data => {
        this.roleCharts = data?.corebook?.roles;
      });
    });
  }

  rollDate(): void {
    if(this.chart) {
      this.redDate = this.dateGeneratorService.generateDate(this.chart, this.roleCharts);
      this.isGhosted = this.redDate?.outcome === 'You were ghosted.' ?? false;
    }
  }

}
