import { DataService } from './../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CP2020VehicleDataService } from './cp2020-vehicle-data.service';

describe('CP2020VehicleDataService', () => {
  let service: CP2020VehicleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(CP2020VehicleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
