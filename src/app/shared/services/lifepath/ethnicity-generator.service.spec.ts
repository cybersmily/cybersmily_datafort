import { DiceService } from './../dice/dice.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { TestBed } from '@angular/core/testing';

import { EthnicityGeneratorService } from './ethnicity-generator.service';

describe('EthnicityGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DataService, DiceService],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: EthnicityGeneratorService = TestBed.get(EthnicityGeneratorService);
    expect(service).toBeTruthy();
  });
});
