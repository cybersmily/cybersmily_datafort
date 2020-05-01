import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { MotivationGeneratorService } from './motivation-generator.service';

describe('MotivationGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      DiceService,
      DataService
    ]
  }));

  it('should be created', () => {
    const service: MotivationGeneratorService = TestBed.get(MotivationGeneratorService);
    expect(service).toBeTruthy();
  });
});
