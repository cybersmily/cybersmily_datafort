import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { ArmorDataAttributesService } from './armor-data-attributes.service';

describe('ArmorDataAttributesService', () => {
  let service: ArmorDataAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });
    service = TestBed.inject(ArmorDataAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
