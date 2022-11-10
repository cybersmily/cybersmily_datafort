import { TestBed } from '@angular/core/testing';

import { Cp2020CyberwarePdfService } from './cp2020-cyberware-pdf.service';

describe('Cp2020CyberwarePdfService', () => {
  let service: Cp2020CyberwarePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020CyberwarePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
