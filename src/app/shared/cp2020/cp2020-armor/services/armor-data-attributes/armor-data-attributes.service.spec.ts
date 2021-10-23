import { TestBed } from '@angular/core/testing';

import { ArmorDataAttributesService } from './armor-data-attributes.service';

describe('ArmorDataAttributesService', () => {
  let service: ArmorDataAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorDataAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
