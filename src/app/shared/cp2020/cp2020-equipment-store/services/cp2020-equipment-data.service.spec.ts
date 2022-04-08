import { TestBed } from '@angular/core/testing';

import { Cp2020EquipmentDataService } from './cp2020-equipment-data.service';

describe('Cp2020EquipmentDataService', () => {
  let service: Cp2020EquipmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020EquipmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
