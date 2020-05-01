import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020RolesDataService } from './cp2020-roles-data.service';

describe('Cp2020RolesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: Cp2020RolesDataService = TestBed.get(Cp2020RolesDataService);
    expect(service).toBeTruthy();
  });
});
