import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { GangGeneratorService } from './gang-generator.service';

describe('GangGeneratorService', () => {
  let service: GangGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiceService, DataService],
    });
    service = TestBed.inject(GangGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
