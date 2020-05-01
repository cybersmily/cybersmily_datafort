import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NrMapGridService } from './nr-map-grid.service';
import { DataService } from './../../shared/services/data.service';

describe('NrMapGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: NrMapGridService = TestBed.get(NrMapGridService);
    expect(service).toBeTruthy();
  });
});
