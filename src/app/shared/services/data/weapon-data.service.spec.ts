import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WeaponDataService } from './weapon-data.service';
import { DataService } from '../data.service';

describe('WeaponDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: WeaponDataService = TestBed.get(WeaponDataService);
    expect(service).toBeTruthy();
  });
});
