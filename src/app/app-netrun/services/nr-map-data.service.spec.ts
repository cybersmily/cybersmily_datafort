import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/data.service';
import { TestBed } from '@angular/core/testing';

import { NrMapDataService } from './nr-map-data.service';

describe('NrMapDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: NrMapDataService = TestBed.get(NrMapDataService);
    expect(service).toBeTruthy();
  });
});
