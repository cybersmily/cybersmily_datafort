import { TestBed } from '@angular/core/testing';

import { CpRedWoundsManagerService } from './cp-red-wounds-manager.service';

describe('CpRedWoundsManagerService', () => {
  let service: CpRedWoundsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedWoundsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
