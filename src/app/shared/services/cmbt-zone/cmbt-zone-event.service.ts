import { JsonDataFiles } from './../file-services';
import { CMBT_ZONE_EVENT_TIME } from './../../models/cmbtzone/cmb-zone-event-time';
import { DiceService } from './../dice/dice.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../file-services';
import { CmbtZoneEventData } from './../../models/cmbtzone/cmbt-zone-event-data';
import { CmbtZoneEvent } from './../../models/cmbtzone/cmbt-zone-event';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmbtZoneEventService {
  _events: CmbtZoneEventData;

  constructor(private dataService: DataService) { }


  /**
   * Creates a single event
   *
   * @returns {Observable<CmbtZoneEvent>}
   * @memberof CmbtZoneEventService
   */
  createEvent(dice: DiceService, chart: CMBT_ZONE_EVENT_TIME): Observable<CmbtZoneEvent> {
    if (this._events) {
      return of(this.generateEvent(dice, chart));
    }
    return this.dataService.GetJson(JsonDataFiles.CP2020_COMBAT_ZONE_EVENTS_JSON)
    .pipe( map( data => {
      this._events = data;
      return this.generateEvent(dice, chart);
    }));
  }


  /**
   * Creates a list of events.
   *
   * @param {number} count
   * @returns {Observable<Array<CmbtZoneEvent>>}
   * @memberof CmbtZoneEventService
   */
  createEvents(count: number, dice: DiceService, chart: CMBT_ZONE_EVENT_TIME): Observable<Array<CmbtZoneEvent>> {
    if (this._events) {
      return of(this.generateEventArray(count, dice, chart));
    }
    return this.dataService.GetJson(JsonDataFiles.CP2020_COMBAT_ZONE_EVENTS_JSON)
    .pipe( map( data => {
      this._events = data;
      return this.generateEventArray(count, dice, chart);
    }));
  }

  /**
   * Generate the event tables for daytime, evening, and aftermidnight to
   * roll against.
   *
   * @param {CmbtZoneEventData} data
   * @returns {CmbtZoneEventData}
   * @memberof CmbtZoneEventService
   */
  generateEventsTable(data: CmbtZoneEventData): CmbtZoneEventData {
    const result: CmbtZoneEventData = {
      daytime: this.generateWeightTable(data.daytime),
      evening: this.generateWeightTable(data.evening),
      aftermidnight: this.generateWeightTable(data.aftermidnight)
    }
    return result;
  }


  /**
   * Generates a table based on the weight of each of the event items.
   *
   * @param {Array<CmbtZoneEvent>} events
   * @returns {Array<CmbtZoneEvent>}
   * @memberof CmbtZoneEventService
   */
  generateWeightTable(events: Array<CmbtZoneEvent>): Array<CmbtZoneEvent> {
    const result = new Array<CmbtZoneEvent>();
    events.forEach( event => {
      for ( let i = 0; i < event.weight; i++) {
        result.push(event);
      }
    });
    return result;
  }


  /**
   * generates a random single event.
   *
   * @param {number} count
   * @returns {Array<CmbtZoneEvent>}
   * @memberof CmbtZoneEventService
   */
  generateEventArray(count: number, dice: DiceService, chart: CMBT_ZONE_EVENT_TIME): Array<CmbtZoneEvent> {
    const results = new Array<CmbtZoneEvent>();
    for (let i = 0; i < count; i++) {
      const roll = dice.generateNumber(0, this._events[chart].length - 1);
      results.push(this._events[chart][roll]);
    }
    return results;
  }


  /**
   * generates a random array of events.
   *
   * @returns {CmbtZoneEvent}
   * @memberof CmbtZoneEventService
   */
  generateEvent(dice: DiceService, chart: CMBT_ZONE_EVENT_TIME): CmbtZoneEvent {
    const roll = dice.generateNumber(0, this._events[chart].length - 1);
    return this._events[chart][roll];
  }
}
