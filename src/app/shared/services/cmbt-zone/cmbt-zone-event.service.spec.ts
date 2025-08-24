import { DataService } from './../file-services';
import { DiceService } from './../dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CmbtZoneEventService } from './cmbt-zone-event.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CmbtZoneEventService', () => {
  let service: CmbtZoneEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DiceService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(CmbtZoneEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
