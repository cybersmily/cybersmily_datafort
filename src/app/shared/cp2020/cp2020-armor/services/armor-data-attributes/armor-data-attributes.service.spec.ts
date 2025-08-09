import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { ArmorDataAttributesService } from './armor-data-attributes.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArmorDataAttributesService', () => {
  let service: ArmorDataAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(ArmorDataAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
