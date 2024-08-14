import { TestBed } from '@angular/core/testing';

import { CrCzLootDataService } from './cr-cz-loot-data.service';

describe('CrCzLootDataService', () => {
  let service: CrCzLootDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzLootDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
