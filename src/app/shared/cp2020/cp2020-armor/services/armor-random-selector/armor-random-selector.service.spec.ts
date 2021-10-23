import { TestBed } from '@angular/core/testing';

import { ArmorRandomSelectorService } from './armor-random-selector.service';

describe('ArmorRandomSelectorService', () => {
  let service: ArmorRandomSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorRandomSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
