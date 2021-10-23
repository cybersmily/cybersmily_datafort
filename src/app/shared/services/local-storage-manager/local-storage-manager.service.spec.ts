import { TestBed } from '@angular/core/testing';

import { LocalStorageManagerService } from './local-storage-manager.service';

describe('LocalStorageManagerService', () => {
  let service: LocalStorageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
