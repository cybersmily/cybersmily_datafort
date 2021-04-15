import { DataService } from './../file-services';
import { DiceService } from './../dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CmbtZoneEventService } from './cmbt-zone-event.service';

describe('CmbtZoneEventService', () => {
  let service: CmbtZoneEventService;

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
    service = TestBed.inject(CmbtZoneEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
