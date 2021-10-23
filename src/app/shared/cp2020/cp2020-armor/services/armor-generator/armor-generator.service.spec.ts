import { TestBed } from '@angular/core/testing';

import { ArmorGeneratorService } from './armor-generator.service';

describe('ArmorGeneratorService', () => {
  let service: ArmorGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
