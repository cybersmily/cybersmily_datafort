import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { GangDataService } from './gang-data.service';

describe('GangDataService', () => {
  let service: GangDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(GangDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
