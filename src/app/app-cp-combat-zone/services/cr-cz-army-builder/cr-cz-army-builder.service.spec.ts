import { TestBed } from '@angular/core/testing';

import { CrCzArmyBuilderService } from './cr-cz-army-builder.service';

describe('CrCzArmyBuilderService', () => {
  let service: CrCzArmyBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzArmyBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
