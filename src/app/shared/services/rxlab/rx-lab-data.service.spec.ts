import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RxLabDataService } from './rx-lab-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RxLabDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

});
