import { SeoService } from './../../shared/services/seo/seo.service';
import { CpRedDayWeatherPdf } from './../models/cp-red-day-weather-pdf';
import { CpRedDayWeather } from './../models/cp-red-day-weather';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { faDice, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../shared/services/file-services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit } from '@angular/core';
import { CpRedWeatherChart } from '../models/cp-red-weather-chart';

@Component({
  selector: 'cs-cp-red-weather-main',
  templateUrl: './cp-red-weather-main.component.html',
  styleUrls: ['./cp-red-weather-main.component.css']
})
export class CpRedWeatherMainComponent implements OnInit {
  faDice = faDice;
  faFilePdf = faFilePdf;

  charts: Array<CpRedWeatherChart> = new Array<CpRedWeatherChart>();
  selectedChart: CpRedWeatherChart = new CpRedWeatherChart();
  season: string = 'summer';
  timeRange: number = 1;
  system: string = 'cpred';
  results: Array<CpRedDayWeather> = new Array<CpRedDayWeather>();
  daysOfWeek: Array<string> = ['SUNDAY','MONDAY','TUESDAY', 'WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

  get monthResults(): Array<any> {
    return [
      this.results.slice(0,7),
      this.results.slice(7,14),
      this.results.slice(14,21),
      this.results.slice(21,28),
      this.results.slice(28)
    ];
  }

  constructor(private dataService: DataService, private dice: DiceService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta('Cybersmily\'s Datafort Weather Generator for Cyberpunk Red',
    'Cybersmily\'s Datafort Weather Generator will generate weather for a day/week/month for Cyberpunk 2020/Cyberpunk Red. ');
    this.dataService
    .GetJson(JsonDataFiles.CPRED_WEAHTER_CHART_JSON)
    .subscribe( data => {
      this.charts = data;
      this.selectedChart = this.charts.find(chart => chart.system === this.system);
      this.rollWeather();
    });
  }

  changeSystem() {
    this.selectedChart = this.charts.find(chart => chart.system === this.system);
  }

  rollWeather() {
    this.results = new Array<CpRedDayWeather>();
    let currCondition = '';
    let conditionDuration = 0;
    for(let i = 0; i < this.timeRange; i++) {
      const seasonChart = this.selectedChart[this.season];
      let die = this.dice.generateNumber(0, seasonChart.tempatures.length - 1);
      let temp = seasonChart.tempatures[die];
      die = this.dice.generateNumber(0, seasonChart.conditions.length - 1);
      let condition = currCondition;
      if (conditionDuration < 1) {
        condition = seasonChart.conditions[die];
        if(condition.toLowerCase() === 'strange') {
          die = this.dice.generateNumber(0, this.selectedChart.strange.length - 1);
          const strange = this.selectedChart.strange[die];
          const duration = this.dice.rollMoreDice(strange.duration);
          if(strange.condition.toLowerCase().includes('cold snap/heat wave')) {
            if (temp < 60) {
              strange.condition = 'Cold Snap';
              currCondition = 'Cold Snap';
            } else {
              strange.condition = 'Heat Wave';
              currCondition = 'Heat Wave';
            }
          }
          condition = `${strange.condition} (${duration.total} ${strange.timeperiod})`;
          if(strange.timeperiod === 'days') {
            conditionDuration = duration.total;
            currCondition = condition;
          }
        }
      }
      conditionDuration--;

      if (condition.includes('Cold Snap')) {
        temp = 30 - this.dice.generateNumber(1,20);
      }
      if (condition.includes('Heat Wave')) {
        temp = 100 + this.dice.generateNumber(1,15);
      }
      this.results.push({tempature: temp, condition: condition});
    }
  }

  saveToPDF() {
    CpRedDayWeatherPdf.createWeatherPDF(this.results);
  }

  toCelsius(temp: number) {
    return Math.ceil(((temp - 32) /1.8) * 10) / 10;
  }

}
