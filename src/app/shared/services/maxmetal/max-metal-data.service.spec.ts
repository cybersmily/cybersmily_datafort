import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { TestBed } from '@angular/core/testing';

import { MaxMetalDataService } from './max-metal-data.service';

describe('MaxMetalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [DataService]

  }));

  it('should be created', () => {
    const service: MaxMetalDataService = TestBed.get(MaxMetalDataService);
    expect(service).toBeTruthy();
  });
});
