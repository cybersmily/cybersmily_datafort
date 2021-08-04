import { JsonDataFiles, DataService } from './../../../services/file-services';
import { LifepathEventsList, LifepathEventsCharts } from './../models';
import { Injectable } from '@angular/core';
import { DiceService } from './../../../services/dice/dice.service';
import { Observable, of, from,  } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LifeEventsGeneratorService {

  chartData: LifepathEventsCharts;
  constructor(private dice: DiceService, private dataService: DataService) { }

  /**
   * generate the list of life events, starting from age 16.
   *
   * @memberof LifepathEventsComponent
   */
  GenerateLifeEvents(lifepathSource: string, years: string, isEventful: boolean): Observable<LifepathEventsList> {
    return this.GetChartData()
    .pipe(
      flatMap(data => of(this.GetEventList(years, data, lifepathSource, isEventful)))
    );
  }

  private GetChartData(): Observable<LifepathEventsCharts> {
    if (!this.chartData) {
      return this.dataService
      .GetJson(JsonDataFiles.CP2020_LIFEPATH_EVENTS_JSON)
      .pipe(map(data => this.chartData = data));
    }
    return of(this.chartData);
  }

  private GetEventList(years: string, chartData: any, lifepathSource: string, isEventful: boolean): LifepathEventsList {
    const levents = new LifepathEventsList();
    levents.NumberOfYears = this.GetNumOfYears(years);

    const startAge = 16;
    levents.Age = startAge + levents.NumberOfYears;
    // for each year roll for an event
    for ( let j = 0; j < levents.NumberOfYears; j++) {
        const event = this.GenerateEvent(chartData, lifepathSource, isEventful);
        levents.Events.push( { age: ((startAge + 1 ) + j), event: event });
    }
    return levents;
  }

  /**
   *Generate an event from the input chart.
   * @param {*} chart - chart to find the event type to generate.
   * @returns {string} - the event generated.
   * @memberof LifepathEventsComponent
   */
  private GenerateEvent(chartData: LifepathEventsCharts, lifepathSource: string, isEventful: boolean): string {
    // if hasEventful is true, then ignore the rolls for 'nothing happened.'
    const die = (isEventful) ? 7 : 9;
    // determine the event type
    const mainRoll = this.dice.generateNumber(0, die);
    let eventDesc = `Nothing happened that year.`;
    if ( mainRoll < 8) {
      const eventType = this.GetEventType(chartData, lifepathSource, mainRoll);
      switch (eventType) {
        case 'GetWin':
          eventDesc = this.GetWin(chartData, lifepathSource);
          break;
        case 'GetDisaster':
          eventDesc = this.GetDisaster(chartData, lifepathSource);
          break;
        case 'GetFriend':
          eventDesc = this.GetFriend(chartData, lifepathSource);
          break;
        case 'GetEnemy':
          eventDesc = this.GetEnemy(chartData, lifepathSource);
          break;
        case 'GetRomance':
          eventDesc = this.GetRomance(chartData, lifepathSource);
          break;
      }
    }
    return eventDesc;
  }

  private GetEventType(chartData, lifepathSource: string, roll: number): string {
    // check to see if the source has a chart.
    const source = (chartData.ChartRoll[lifepathSource]) ? lifepathSource : 'CP2020';
    const mainEvent = chartData.ChartRoll[source][roll];
    // check to see if there is a chart for the main event,
    // if not then it means nothing happened.
    const eventRoll = this.dice.generateNumber(0, (mainEvent.chart.length - 1));
    return mainEvent.chart[eventRoll];
  }

  /**
   * get the number of years as number or generate a random number.
   * @param {*} input
   * @returns {number}
   * @memberof LifepathEventsComponent
   */
  private GetNumOfYears(input: string): number {
    let years = parseInt(input, 0);
    if (isNaN(years) || years < 1) {
        years = this.dice.generateNumber(2, 12);
   }
   return years;
  }

  // Big Wins
  private GetWin(chart: LifepathEventsCharts, version: string) {
      const c = 'Big Win: ' + this.dice.rollOnChart(chart.Wins, version);
      return c;
  }

  // Big Problems
  private GetDisaster(chart: LifepathEventsCharts, version: string) {
      let c = 'Big Lose: ' + this.dice.rollOnChart(chart.Disasters.Event, version);
      c += ' What are you going to do: ' + this.dice.rollOnChart(chart.Disasters.Response, version);
      return c;
  }

  // Friends
  private GetFriend(chart: LifepathEventsCharts, version: string) {
      const isMale = ((this.dice.generateNumber(1, 10) % 2) === 0);
      let s = 'Made a Friend: ' + ((isMale) ? 'He\'s ' : 'She\'s ') + this.dice.rollOnChart(chart.Friends, version);
      if (s.indexOf('{0}') > -1) {
        s = s.replace('{0}', ((isMale) ? 'brother' : 'sister'));
      }
      return s;
  }

  // Enemies
  private GetEnemy(chart: LifepathEventsCharts, version: string) {
      const isMale = ((this.dice.generateNumber(1, 10) % 2) === 0);
      let s = 'Made an Enemy: ' + ((isMale) ? 'He\'s ' : 'She\'s ');
      s += this.dice.rollOnChart(chart.Enemies.who, version);
      s += ' Emnity started due to: ' + this.dice.rollOnChart(chart.Enemies.cause, version);
      s += ' ' + this.dice.rollOnChart(chart.Enemies.fracked, version);
      s += ' Next time you meet, reaction is: ' + this.dice.rollOnChart(chart.Enemies.reaction, version);
      s += ' Their backup is ' + this.dice.rollOnChart(chart.Enemies.resource, version);
      if (!isMale && s.indexOf('his') > -1) { s = s.replace(/his/gi, 'her'); }
      if (!isMale && s.indexOf('him') > -1) { s = s.replace(/him/gi, 'her'); }
      if (!isMale && s.indexOf('him') > -1) { s = s.replace('he\'s', 'she\'s'); }
      return s;
  }

  // Romantic Involvement
  private GetRomance(chart: LifepathEventsCharts, version: string) {
      let s = 'Romantic Involvement: ' + this.dice.rollOnChart(chart.RomanticInvolvement.Type, version);
      if (version === 'ProtectServe') {
          s += ' ' + this.dice.rollOnChart(chart.RomanticInvolvement.Type, version);
      }
      if (s.indexOf('Tragic') < 0 && s.indexOf('Problem') < 0) {
        return s;
      }
      if (s.indexOf('Tragic') > -1) {
        s += ' ' + this.dice.rollOnChart(chart.RomanticInvolvement.Tragic, version);
      } else {
        s += ' ' + this.dice.rollOnChart(chart.RomanticInvolvement.Problems, version);
      }
      s += ' ' + this.dice.rollOnChart(chart.RomanticInvolvement.Feeling, version);
      return s;
  }

}
