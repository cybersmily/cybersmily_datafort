import { DiceService } from './../../../../services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { ClubNameGeneratorService } from './club-name-generator.service';

describe('ClubNameGeneratorService', () => {
  let service: ClubNameGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, DiceService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClubNameGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
