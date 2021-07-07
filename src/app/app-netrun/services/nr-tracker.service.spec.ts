import { DiceRolls } from './../../shared/models/dice-rolls';
import { NR_TRACE_SUCCESS } from './../models/nr-constants';
import { NRDataFort } from './../models/nr-data-fort';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TestBed, inject } from '@angular/core/testing';

import { NrTrackerService } from './nr-tracker.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { NRTraceItem } from '../models';
import { doesNotReject } from 'assert';
import { exception } from 'console';

describe('NrTrackerService', () => {
  let service: NrTrackerService;
  let dice: DiceService;
  let testTraceItems: Array<NRTraceItem>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrTrackerService, DiceService]
    });
    dice = new DiceService();
    service = new NrTrackerService(dice);
    testTraceItems = new Array<NRTraceItem>();
    for (let i = 0; i < 5; i++) {
      testTraceItems.push({ trace: i, city: `city${i}`, region: `region${i}` });
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add trace to list', (done) => {
    service.addTrace(new NRTraceItem());
    service.TraceList.subscribe(data => {
      expect(data.length).toEqual(1);
      done();
    });
  });

  it('should reset Trace list', (done) => {
    testTraceItems.forEach(trace => {
      service.addTrace(trace);
    });
    service.resetTraces();
    service.TraceList.subscribe(data => {
      expect(data.length).toEqual(0);
      done();
    });
  });


  it('should get total trace value', () => {
    testTraceItems.forEach(trace => {
      service.addTrace(trace);
    });
    expect(service.getTotal()).toEqual(10);
  });

  describe('Hack LDL with set die rolls', () => {
    let testDF: NRDataFort;
    let die: DiceRolls;

    beforeEach(() => {
      testDF = {type: 'df_lv3', name: 'testDF', img: 'df_lv3'};
      testDF.trace = 1;
      testDF.region = 'testRegion';
      testDF.security = 1;
      die = new DiceRolls();
      die.total = 3;
      die.rolls.push(3);
    });

    it('should be undefined', () => {
      const die = new DiceRolls();
      die.rolls.push(3);
      spyOn(dice, 'rollDice').and.returnValue(die);
      const result = service.hackLDL(undefined);
      expect(result).toBeUndefined();
    });

    it('should be successful', () => {
      spyOn(dice, 'rollDice').and.returnValue( die);
      const result = service.hackLDL(testDF);
      expect(result.succeed).toBeTruthy();
      expect(result.dump).toEqual(false);
      expect(result.result).toEqual(NR_TRACE_SUCCESS);
    });

    it('should be fail with line cut and charged for call', () => {
      testDF.security = 4;
      spyOn(dice, 'rollDice').and.returnValue( die);
      const result = service.hackLDL(testDF);
      expect(result.succeed).toEqual(false);
      expect(result.dump).toEqual(true);
      expect(result.result).toContain('cut off');
      expect(result.result).toContain('charged');
    });

    it('should be fail with line cut and NETWATCH has access code.', () => {
      testDF.security = 6;
      die.total = 5;
      die.rolls = [5];
      spyOn(dice, 'rollDice').and.returnValue( die);
      const result = service.hackLDL(testDF);
      expect(result.succeed).toEqual(false);
      expect(result.dump).toEqual(true);
      expect(result.result).toContain('cut off');
      expect(result.result).toContain('NETWATCH');
    });

    it('should be fail with line cut and NetCops bust.', () => {
      testDF.security = 7;
      die.total = 6;
      die.rolls = [6];
      spyOn(dice, 'rollDice').and.returnValue( die);
      const result = service.hackLDL(testDF);
      expect(result.succeed).toEqual(false);
      expect(result.dump).toEqual(false);
      expect(result.result).toContain('The NetCops try');
      expect(result.result).toContain('All Net Bulletin');
      expect(result.result).toContain('only a matter of time...');
    });
  });


  describe('Get DIFF of fort', () => {
    it('should get BBS Diff of the LDL', () => {
      const result = service.getDiff('df_bbs', false, false);
      expect(result).toEqual(10);
    });

    it('should get Level 1 Diff of the LDL', () => {
      const result = service.getDiff('df_lv1', false, false);
      expect(result).toEqual(15);
    });

    it('should get Level 2 Diff of the LDL', () => {
      const result = service.getDiff('df_lv2', false, false);
      expect(result).toEqual(20);
    });

    it('should get Level 3 Diff of the LDL', () => {
      const result = service.getDiff('df_lv3', false, false);
      expect(result).toEqual(25);
    });

    it('should get private Diff of the LDL', () => {
      const result = service.getDiff('df_pvt', false, false);
      expect(result).toEqual(20);
    });

    it('should get public Diff of the LDL', () => {
      const result = service.getDiff('df_pbc', false, false);
      expect(result).toEqual(10);
    });

    it('should get Level 1 Diff of the LDL', () => {
      const result = service.getDiff('df_blk', false, false);
      expect(result).toEqual(30);
    });

    it('should get other Diff of the LDL', () => {
      const result = service.getDiff('test_df', false, false);
      expect(result).toEqual(0);
    });

    it('should get public Diff with sysop of the LDL', () => {
      const result = service.getDiff('df_pbc', true, false);
      expect(result).toEqual(15);
    });

    it('should get public Diff with AI of the LDL', () => {
      const result = service.getDiff('df_pbc', false, true);
      expect(result).toEqual(15);
    });

    it('should get public Diff with Sysop and AI of the LDL', () => {
      const result = service.getDiff('df_pbc', true, true);
      expect(result).toEqual(20);
    });
  });

});
