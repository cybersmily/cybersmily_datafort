import { Observable } from 'rxjs';
import { WEATHER_SEASONS, DAYS_WEEK_ABBREV } from './../models/constants';
import { CpRedWeatherGeneratorService } from './../services/cp-red-weather-generator.service';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CpRedDayWeatherPdf } from './../models/cp-red-day-weather-pdf';
import { CpRedDayWeather } from './../models/cp-red-day-weather';
import { faDice, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-cp-red-weather-main',
    templateUrl: './cp-red-weather-main.component.html',
    styleUrls: ['./cp-red-weather-main.component.css'],
    standalone: false
})
export class CpRedWeatherMainComponent implements OnInit {
  faDice = faDice;
  faFilePdf = faFilePdf;

  WEATHER_SEASONS = WEATHER_SEASONS;
  DAYS_OF_WEEK = DAYS_WEEK_ABBREV;

  season = WEATHER_SEASONS.SUMMER;
  timeRange: number = 1;
  system: string = 'cpred';
  weatherForecast$: Observable<Array<CpRedDayWeather>>;

  constructor(private weatherGenerator:CpRedWeatherGeneratorService , private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta('Cybersmily\'s Datafort Weather Generator for Cyberpunk Red',
    'Cybersmily\'s Datafort Weather Generator will generate weather for a day/week/month for Cyberpunk 2020/Cyberpunk Red. ');
    this.weatherForecast$ = this.weatherGenerator.weatherForcast;
  }

  rollWeather(): void {
    this.weatherGenerator.generate(this.system, this.season, this.timeRange);
  }

  saveToPDF(): void {
    CpRedDayWeatherPdf.createWeatherPDF(this.weatherGenerator.getArray());
  }
}
