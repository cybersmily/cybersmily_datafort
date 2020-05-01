import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed } from '@angular/core/testing';

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
});
