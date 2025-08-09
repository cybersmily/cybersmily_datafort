import { DataService } from './../../../services/file-services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SourcesDataService } from './sources-data.service';

describe('SourcesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi())]
}));

  it('should be created', () => {
    const service: SourcesDataService = TestBed.inject(SourcesDataService);
    expect(service).toBeTruthy();
  });
});
