import { TestBed } from '@angular/core/testing';

import { ArmorListService } from './armor-list.service';

describe('ArmorListService', () => {
  let service: ArmorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
