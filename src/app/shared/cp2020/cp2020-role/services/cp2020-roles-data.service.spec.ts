import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from '../../../services/file-services';
import { TestBed } from '@angular/core/testing';

import { Cp2020RolesDataService } from './cp2020-roles-data.service';

describe('Cp2020RolesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi())]
}));

  it('should be created', () => {
    const service: Cp2020RolesDataService = TestBed.inject(Cp2020RolesDataService);
    expect(service).toBeTruthy();
  });
});
