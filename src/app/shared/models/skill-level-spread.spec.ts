import { DiceService } from './../services/dice/dice.service';
import { SkillLevelSpread } from './skill-level-spread';
import { TestBed } from '@angular/core/testing';

describe('SkillLevelSpread', () => {
  let skillSpread: SkillLevelSpread;
  let diceService: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
    diceService = TestBed.inject(DiceService);
    skillSpread = new SkillLevelSpread(diceService);
  });

  it('should be created', () => {
    expect(skillSpread).toBeTruthy();
  });

  describe('Normal Levels', () => {
    it('should get 1', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(1);
      expect(skillSpread.normal).toEqual(1);
    });
    it('should get 2', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(5);
      expect(skillSpread.normal).toEqual(2);
    });
    it('should get 3', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(10);
      expect(skillSpread.normal).toEqual(3);
    });
    it('should get 4', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(15);
      expect(skillSpread.normal).toEqual(4);
    });
    it('should get 5', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(20);
      expect(skillSpread.normal).toEqual(5);
    });
    it('should get 6', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(22);
      expect(skillSpread.normal).toEqual(6);
    });
    it('should get 7', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(25);
      expect(skillSpread.normal).toEqual(7);
    });
    it('should get 8', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(27);
      expect(skillSpread.normal).toEqual(8);
    });
    it('should get 0', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(30);
      expect(skillSpread.normal).toEqual(9);
    });
    it('should get 10 under 1', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(0);
      expect(skillSpread.normal).toEqual(10);
    });
    it('should get 10 for over 30', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(31);
      expect(skillSpread.normal).toEqual(10);
    });
  });

  describe('Low Levels', () => {
    it('should get 1', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(1);
      expect(skillSpread.lowlevel).toEqual(1);
    });
    it('should get 2', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(5);
      expect(skillSpread.lowlevel).toEqual(2);
    });
    it('should get 3', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(10);
      expect(skillSpread.lowlevel).toEqual(3);
    });
    it('should get 4', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(15);
      expect(skillSpread.lowlevel).toEqual(4);
    });
    it('should get 5', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(20);
      expect(skillSpread.lowlevel).toEqual(5);
    });
    it('should get 6', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(25);
      expect(skillSpread.lowlevel).toEqual(6);
    });
    it('should get 7', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(27);
      expect(skillSpread.lowlevel).toEqual(7);
    });
    it('should get 8', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(29);
      expect(skillSpread.lowlevel).toEqual(8);
    });
    it('should get 0', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(30);
      expect(skillSpread.lowlevel).toEqual(9);
    });
    it('should get 10 under 1', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(0);
      expect(skillSpread.lowlevel).toEqual(10);
    });
    it('should get 10 for over 30', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(31);
      expect(skillSpread.lowlevel).toEqual(10);
    });
  });


  describe('High Levels', () => {
    it('should get 1', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(1);
      expect(skillSpread.highlevel).toEqual(1);
    });
    it('should get 2', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(5);
      expect(skillSpread.highlevel).toEqual(2);
    });
    it('should get 3', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(8);
      expect(skillSpread.highlevel).toEqual(3);
    });
    it('should get 4', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(10);
      expect(skillSpread.highlevel).toEqual(4);
    });
    it('should get 5', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(15);
      expect(skillSpread.highlevel).toEqual(5);
    });
    it('should get 6', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(20);
      expect(skillSpread.highlevel).toEqual(6);
    });
    it('should get 7', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(24);
      expect(skillSpread.highlevel).toEqual(7);
    });
    it('should get 8', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(25);
      expect(skillSpread.highlevel).toEqual(8);
    });
    it('should get 0', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(30);
      expect(skillSpread.highlevel).toEqual(9);
    });
    it('should get 10 under 1', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(0);
      expect(skillSpread.highlevel).toEqual(10);
    });
    it('should get 10 for over 30', () => {
      spyOn(diceService, 'generateNumber').and.returnValue(31);
      expect(skillSpread.highlevel).toEqual(10);
    });
  });

});
