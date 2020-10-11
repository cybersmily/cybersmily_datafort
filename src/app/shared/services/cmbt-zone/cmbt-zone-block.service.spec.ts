import { DiceService } from '../dice/dice.service';
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CmbtZoneBlockService } from './cmbt-zone-block.service';

describe('CmbtZoneBlockService', () => {
  let service: CmbtZoneBlockService;
  let dice: DiceService;
  let data: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService
      ]
    });
    service = TestBed.inject(CmbtZoneBlockService);
    dice = TestBed.inject(DiceService);
    data = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
