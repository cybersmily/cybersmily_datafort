import { DataService } from '../../../services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { MartialArtsDataService } from './martial-arts-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtsDataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        MartialArtsDataService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
  });

  it('should be created', waitForAsync(inject([MartialArtsDataService], (service: MartialArtsDataService)  => {
    expect(service).toBeTruthy();
  })));
});
