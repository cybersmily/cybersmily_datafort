import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020ACPADataAttributesService } from './cp2020-acpa-data-attributes.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020ACPADataAttributesService', () => {
  let service: Cp2020ACPADataAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(Cp2020ACPADataAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
