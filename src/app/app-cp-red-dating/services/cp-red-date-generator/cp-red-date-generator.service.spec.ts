import { DataService } from './../../../shared/services/file-services/dataservice/data.service';
import { DiceService } from './../../../shared/services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedDateGeneratorService } from './cp-red-date-generator.service';

describe('CpRedDateGeneratorService', () => {
  let service: CpRedDateGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiceService,
        DataService
      ]
    });
    service = TestBed.inject(CpRedDateGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
