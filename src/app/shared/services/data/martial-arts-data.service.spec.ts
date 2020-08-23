import { DataService } from './../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';

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

  it('should be created', async(inject([MartialArtsDataService], (service: MartialArtsDataService)  => {
    expect(service).toBeTruthy();
  })));
});
