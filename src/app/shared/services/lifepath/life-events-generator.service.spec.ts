import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed, inject } from '@angular/core/testing';

import { LifeEventsGeneratorService } from './life-events-generator.service';

describe('LifeEventsGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService, DataService],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: LifeEventsGeneratorService = TestBed.get(LifeEventsGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should have Nothing Happened Event', inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', false).subscribe( data => {
      const events = data.Events;
      const results = events.some(e => e.event.toLowerCase().includes('nothing happened'));
      expect(results).toBeTruthy();
    });
  }));

  it('should not have Nothing Happened Event', inject([LifeEventsGeneratorService], (service: LifeEventsGeneratorService) => {
    service.GenerateLifeEvents('CP2020', '50', true).subscribe( data => {
      const events = data.Events;
      const results = !(events.some(e => e.event.toLowerCase().includes('nothing happened')));
      expect(results).toBeTruthy();
    });
  }));

});
