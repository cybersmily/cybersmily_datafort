import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BodegasGeneratorService } from './bodegas-generator.service';

describe('BodegasGeneratorService', () => {
  let service: BodegasGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        DiceService
      ]
    });
    service = TestBed.inject(BodegasGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
