import { TestBed } from '@angular/core/testing';

import { Cp2020GearDataService } from './cp2020-gear-data.service';

describe('Cp2020GearDataService', () => {
  let service: Cp2020GearDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020GearDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
