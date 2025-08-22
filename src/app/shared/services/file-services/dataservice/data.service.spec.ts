import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should be created', inject([DataService, HttpTestingController], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
