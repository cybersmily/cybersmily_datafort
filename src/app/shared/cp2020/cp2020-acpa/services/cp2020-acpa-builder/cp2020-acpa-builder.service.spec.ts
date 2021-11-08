import { TestBed } from '@angular/core/testing';

import { Cp2020ACPABuilderService } from './cp2020-acpa-builder.service';

describe('Cp2020AcpaBuilderService', () => {
  let service: Cp2020ACPABuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ACPABuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
