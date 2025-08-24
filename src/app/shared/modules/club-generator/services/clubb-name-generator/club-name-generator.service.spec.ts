import { DiceService } from './../../../../services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { ClubNameGeneratorService } from './club-name-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClubNameGeneratorService', () => {
  let service: ClubNameGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, DiceService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ClubNameGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
