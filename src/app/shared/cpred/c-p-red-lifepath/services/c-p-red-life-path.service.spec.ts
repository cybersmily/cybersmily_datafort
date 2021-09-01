import { DataService } from './../../../services/file-services/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CPRedLifePathService } from './c-p-red-life-path.service';

describe('CPRedLifePathService', () => {
  let service: CPRedLifePathService;

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
    service = TestBed.inject(CPRedLifePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
