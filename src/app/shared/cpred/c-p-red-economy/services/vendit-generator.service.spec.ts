import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { VenditGeneratorService } from './vendit-generator.service';

describe('VenditGeneratorService', () => {
  let service: VenditGeneratorService;

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
    service = TestBed.inject(VenditGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
