import { TestBed } from '@angular/core/testing';

import { Cp2020ACPADataAttributesService } from './cp2020-acpa-data-attributes.service';

describe('Cp2020ACPADataAttributesService', () => {
  let service: Cp2020ACPADataAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ACPADataAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
