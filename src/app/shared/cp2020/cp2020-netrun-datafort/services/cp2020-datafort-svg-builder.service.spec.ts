import { TestBed } from '@angular/core/testing';

import { Cp2020DatafortSvgBuilderService } from './cp2020-datafort-svg-builder.service';

describe('Cp2020DatafortSvgBuilderService', () => {
  let service: Cp2020DatafortSvgBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020DatafortSvgBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
