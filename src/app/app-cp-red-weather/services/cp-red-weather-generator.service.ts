import { BehaviorSubject } from 'rxjs';
import { WEATHER_SEASONS, HEAT_WAVE, COLD_SNAP } from './../models/constants';
import { CpRedDayWeather } from './../models/cp-red-day-weather';
import { CpRedWeatherChart } from './../models/cp-red-weather-chart';
import { DiceService } from './../../shared/services/dice/dice.service';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpRedWeatherGeneratorService {
  private _charts: Array<CpRedWeatherChart>;
  private _weatherForecast = new BehaviorSubject<Array<CpRedDayWeather>>(
    new Array<CpRedDayWeather>()
  );
  weatherForcast = this._weatherForecast.asObservable();

  constructor(private dataService: DataService, private dice: DiceService) {}

  getArray(): Array<CpRedDayWeather> {
    return this._weatherForecast.getValue();
  }

  generate(system: string, season: string, timeRange: number) {
    if (this._charts) {
      this._weatherForecast.next(
        this.generateWeather(system, season, timeRange)
      );
    } else {
      this.dataService
        .GetJson<Array<CpRedWeatherChart>>(
          JsonDataFiles.CPRED_WEAHTER_CHART_JSON
        )
        .subscribe((data) => {
          this._charts = data;
          this._weatherForecast.next(
            this.generateWeather(system, season, timeRange)
          );
        });
    }
  }

  private generateWeather(
    system: string,
    season: string,
    timeRange: number
  ): Array<CpRedDayWeather> {
    const selectedChart = this._charts.find((chart) => chart.system === system);
    return this.rollWeather(selectedChart, season, timeRange);
  }

  private rollWeather(
    chart: CpRedWeatherChart,
    season: string,
    timeRange: number
  ): Array<CpRedDayWeather> {
    const results = new Array<CpRedDayWeather>();
    let currCondition = null;
    for (let i = 0; i < timeRange; i++) {
      let result = this.generateDayWeather(chart, season, currCondition);
      currCondition =
        result.duration > 0
          ? { condition: result.weather.condition, duration: result.duration }
          : null;
      results.push(result.weather);
    }
    return results;
  }

  generateDayWeather(
    chart: CpRedWeatherChart,
    season: string,
    continued?: { condition: string; duration: number }
  ): { weather: CpRedDayWeather; duration: number } {
    let condition =
      continued?.condition ??
      this.dice.rollRandomItem(chart[season].conditions);
    let temp = this.getTemp(chart[season].tempatures, condition);
    let weatherDuration = continued?.duration ?? 0;

    if (condition.toLowerCase() === 'strange') {
      const strange = { ...this.dice.rollRandomItem(chart.strange) };
      const duration = this.dice.rollMoreDice(strange.duration);
      if (strange.condition.includes(`${COLD_SNAP}/${HEAT_WAVE}`)) {
        if (
          temp < 60 ||
          (season === WEATHER_SEASONS.WINTER.valueOf() && temp === 60)
        ) {
          strange.condition = COLD_SNAP;
        } else {
          strange.condition = HEAT_WAVE;
        }
        // reset the temp
        temp = this.getTemp(chart[season].tempatures, strange.condition);
      }
      condition = `${strange.condition} (${duration.total} ${strange.timeperiod})`;
      if (strange.timeperiod === 'days') {
        weatherDuration = duration.total;
      }
    }
    // set temp for heat wave/cold snaps
    return {
      weather: { tempature: temp, condition: condition },
      duration: weatherDuration - 1,
    };
  }

  getTemp(tempChart: Array<number>, condition: string): number {
    if (condition?.includes(COLD_SNAP)) {
      return 30 - this.dice.generateNumber(1, 20);
    } else if (condition?.includes(HEAT_WAVE)) {
      return 100 + this.dice.generateNumber(1, 15);
    } else {
      return this.dice.rollRandomItem(tempChart);
    }
  }
}
