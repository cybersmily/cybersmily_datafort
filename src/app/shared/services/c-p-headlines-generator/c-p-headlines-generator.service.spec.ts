import { DataService } from './../file-services/dataservice/data.service';
import { DiceService } from './../dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CPHeadlinesGeneratorService } from './c-p-headlines-generator.service';

describe('CPHeadlinesGeneratorService', () => {
  let service: CPHeadlinesGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DiceService,
        DataService
      ]
    });
    service = TestBed.inject(CPHeadlinesGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
