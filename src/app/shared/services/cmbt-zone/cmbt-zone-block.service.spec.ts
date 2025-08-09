import { DiceService } from '../dice/dice.service';
import { DataService } from './../file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CmbtZoneBlockService } from './cmbt-zone-block.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CmbtZoneBlockService', () => {
  let service: CmbtZoneBlockService;
  let dice: DiceService;
  let data: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
