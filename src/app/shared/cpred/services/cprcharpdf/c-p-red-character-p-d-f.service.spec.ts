import { TestBed } from '@angular/core/testing';

import { CPRedCharacterPDFService } from './c-p-red-character-p-d-f.service';

describe('CPRedCharacterPDFService', () => {
  let service: CPRedCharacterPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CPRedCharacterPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
