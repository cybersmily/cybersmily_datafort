import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed, inject, async } from '@angular/core/testing';

import { LifeEventsGeneratorService } from './life-events-generator.service';

describe('LifeEventsGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService, DataService],
      imports: [HttpClientModule]
    });
  });


  it('should be created', () => {
    const service: LifeEventsGeneratorService = TestBed.get(LifeEventsGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should have Nothing Happened Event', async(inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '1', false).subscribe( data => {
      const events = data.Events;
      const results = events.some(e => e.event.toLowerCase().includes('nothing happened'));
      expect(data).toBeTruthy('No data returned.');
      expect(data.Events.length > 0).toBeTruthy('No events returned');
      expect(data.Events[0]).toBeTruthy('Event is empty.');
      expect(data.Events[0].age === 17).toBeTruthy('Event age isn\'t 17.');
      expect(data.Events[0].event && data.Events[0].event !== '').toBeTruthy('Event details is empty.');
      expect(data.Age === 17).toBeTruthy('Age should be 17.');
      expect(data.NumberOfYears === 1).toBeTruthy('NumberOfYears should be 1.');
    });
  })));

  it('should have Nothing Happened Event', async(inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', false).subscribe( data => {
      const events = data.Events;
      const results = events.some(e => e.event.toLowerCase().includes('nothing happened'));
      expect(results).toBeTruthy('Should not contain Nothing Happened event.');
    });
  })));

  it('should not have Nothing Happened Event', async(inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', true).subscribe( data => {
      const events = data.Events;
      const results = !(events.some(e => e.event.toLowerCase().includes('nothing happened')));
      expect(results).toBeTruthy();
    });
  })));

  it('should have Big Win/Lose', async(inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', true).subscribe( data => {
      const events = data.Events;
      const results = (events.some(e => e.event.toLowerCase().includes('big win') || e.event.toLowerCase().includes('big lose')));
      expect(results).toBeTruthy('Should contain Big Win/Lose');
    });
  })));

  it('should have Made a Friend', async(inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', true).subscribe( data => {
      const events = data.Events;
      const results = (events.some(e => e.event.toLowerCase().includes('made a friend')
        || e.event.toLowerCase().includes('made an enemy')));
      expect(results).toBeTruthy('Should contain Made Friend/Enemy');
    });
  })));

  it('should have Romantic Involvement', async(inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', true).subscribe( data => {
      const events = data.Events;
      const results = (events.some(e => e.event.toLowerCase().includes('romantic involvement')));
      expect(results).toBeTruthy('Should have Romantic Involvement');
    });
  })));

});
