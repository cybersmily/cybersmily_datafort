import { DataService } from './../data.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SourcesDataService } from './sources-data.service';

describe('SourcesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: SourcesDataService = TestBed.get(SourcesDataService);
    expect(service).toBeTruthy();
  });
});
