import { TestBed } from '@angular/core/testing';

import { Cp2020DatafortBuilderService } from './cp2020-datafort-builder.service';

describe('Cp2020DatafortBuilderService', () => {
  let service: Cp2020DatafortBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020DatafortBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
