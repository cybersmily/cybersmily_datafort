import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../data.service';
import { TestBed } from '@angular/core/testing';

import { ArmorDataService } from './armor-data.service';

describe('ArmorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: ArmorDataService = TestBed.get(ArmorDataService);
    expect(service).toBeTruthy();
  });
});
