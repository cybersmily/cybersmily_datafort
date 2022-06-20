import { TestBed } from '@angular/core/testing';

import { CpRedRolesManagerService } from './cp-red-roles-manager.service';

describe('CpRedRolesManagerService', () => {
  let service: CpRedRolesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedRolesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
