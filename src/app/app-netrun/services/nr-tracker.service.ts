import { NR_TRACE_SUCCESS,
  NR_DATAFORT_BBS,
  NR_DATAFORT_LEVEL1,
  NR_DATAFORT_LEVEL2,
  NR_DATAFORT_LEVEL3,
  NR_DATAFORT_PRIVATE,
  NR_DATAFORT_PUBLIC,
  NR_DATAFORT_BLACK } from './../models/nr-constants';
import { DiceService } from '../../shared/services/dice/dice.service';
import { BehaviorSubject } from 'rxjs';
import { NRDataFort, NRTraceItem, NRTraceResult } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export class NrTrackerService {
  _traceList = new BehaviorSubject<NRTraceItem[]>(new Array<NRTraceItem>());
  TraceList = this._traceList.asObservable();

  constructor(private diceService: DiceService) {}

  hackLDL(df: NRDataFort): NRTraceResult {
    // roll to determine if the person hacks it.
    const roll = this.diceService.rollDice('1d10');
    if (roll.total >= df.security) {
      const traceItem = new NRTraceItem();
      traceItem.city = df.name;
      traceItem.trace = df.trace;
      traceItem.region = df.region;
      this.addTrace(traceItem);
      return new NRTraceResult(true, NR_TRACE_SUCCESS, false);
    }
    // determine failure on chart.
    const rll = this.diceService.rollDice('1d10');
    let result = '';
    switch (rll.total) {
      case 1:
      case 2:
      case 3:
      case 4:
        result = 'You are cut off the line and are charged for the call.';
        return new NRTraceResult(false, result, true);
      case 5:
        result =
          'You are cut off and NETWATCH is given your access code. Expect a friendly visit in Realspace soon.';
        return new NRTraceResult(false, result, true);
      default:
        result = 'The NetCops try to bust you on the spot. ';
        switch (this.diceService.rollDice('1d6').total) {
          case 1:
          case 2:
            result +=
              ' They fine you ' +
              this.diceService.rollDice('1d6').total * 100 +
              'eb.';
            return new NRTraceResult(false, result, true);
          case 3:
          case 4:
          case 5:
            result += ' You escape. They don\'t have a trace on you, ';
            result += 'but will spend 1D6+1 days patrolling that area of the Net hoping you\'ll show up.';
            return new NRTraceResult(false, result, false);
          default:
            result += ' You escape, but they issue and ANB (All Net Bulletin) on you. ';
            result += 'They know you\'re out there, and they\'re looking for you. It\'s only a matter of time...';
            return new NRTraceResult(false, result, false);
        }
    }
  }

  resetTraces() {
    this._traceList.next(new Array<NRTraceItem>());
  }

  addTrace(trace: NRTraceItem) {
    const lst = this._traceList.value;
    lst.push(trace);
    this._traceList.next(lst);
  }

  getTotal(): number {
    const lst = this._traceList.value.slice();
    const total: number = lst
      .map( trace => trace.trace )
      .reduce( (a, b) => a + b );
    return total;
  }

  getDiff(datafortType: string, hasSysop: boolean, hasAI: boolean ) {
    let diff = 0;
    diff = ((hasSysop) ? 5 : 0)  + ((hasAI) ? 5 : 0);
    switch(datafortType) {
      case NR_DATAFORT_BBS:
        return diff + 10;
      case NR_DATAFORT_LEVEL1:
        return diff + 15;
      case NR_DATAFORT_LEVEL2:
        return diff + 20;
      case NR_DATAFORT_LEVEL3:
        return diff + 25;
      case NR_DATAFORT_PUBLIC:
        return diff + 10;
      case NR_DATAFORT_PRIVATE:
      return diff + 20;
      case NR_DATAFORT_BLACK:
        return diff + 30;
      default:
        return diff + 0;
    }
  }
}
