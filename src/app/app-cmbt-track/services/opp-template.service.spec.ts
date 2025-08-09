import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { TestBed } from '@angular/core/testing';

import { OppTemplateService } from './opp-template.service';

describe('OppTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi())
    ]
}));

  it('should be created', () => {
    const service: OppTemplateService = TestBed.get(OppTemplateService);
    expect(service).toBeTruthy();
  });
});
