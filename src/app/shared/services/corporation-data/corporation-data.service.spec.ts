import { DataService } from './../file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CorporationDataService } from './corporation-data.service';

describe('CorporationDataService', () => {
  let service: CorporationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(CorporationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
