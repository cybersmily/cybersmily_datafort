import { TestBed } from '@angular/core/testing';

import { CpRedRolesDataService } from './cp-red-roles-data.service';

describe('CpRedRolesDataService', () => {
  let service: CpRedRolesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedRolesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
