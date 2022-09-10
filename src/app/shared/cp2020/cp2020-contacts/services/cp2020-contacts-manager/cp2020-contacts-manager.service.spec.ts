import { TestBed } from '@angular/core/testing';

import { Cp2020ContactsManagerService } from './cp2020-contacts-manager.service';

describe('Cp2020ContactsManagerService', () => {
  let service: Cp2020ContactsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ContactsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
