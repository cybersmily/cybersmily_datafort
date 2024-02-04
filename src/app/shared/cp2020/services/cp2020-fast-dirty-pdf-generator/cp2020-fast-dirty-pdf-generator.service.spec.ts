import { TestBed } from '@angular/core/testing';

import { Cp2020FastDirtyPdfGeneratorService } from './cp2020-fast-dirty-pdf-generator.service';

describe('Cp2020FastDirtyPdfGeneratorService', () => {
  let service: Cp2020FastDirtyPdfGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020FastDirtyPdfGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
