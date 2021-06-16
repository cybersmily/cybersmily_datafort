import { DataService } from './../file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { MartialArtsDataService } from './martial-arts-data.service';

describe('MartialArtsDataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MartialArtsDataService,
        DataService
      ]
    });
  });

  it('should be created', waitForAsync(inject([MartialArtsDataService], (service: MartialArtsDataService)  => {
    expect(service).toBeTruthy();
  })));
});
