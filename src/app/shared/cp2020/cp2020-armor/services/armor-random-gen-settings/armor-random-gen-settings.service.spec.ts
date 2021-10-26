import { TestBed } from '@angular/core/testing';

import { ArmorRandomGenSettingsService } from './armor-random-gen-settings.service';

describe('ArmorRandomGenSettingsService', () => {
  let service: ArmorRandomGenSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorRandomGenSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
