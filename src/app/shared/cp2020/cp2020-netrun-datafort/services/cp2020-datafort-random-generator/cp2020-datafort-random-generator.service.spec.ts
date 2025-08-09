import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DiceService } from '../../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020DatafortRandomGeneratorService } from './cp2020-datafort-random-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020DatafortRandomGeneratorService', () => {
  let service: Cp2020DatafortRandomGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DiceService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(Cp2020DatafortRandomGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
