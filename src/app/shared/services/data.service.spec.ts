import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([DataService, HttpTestingController], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
