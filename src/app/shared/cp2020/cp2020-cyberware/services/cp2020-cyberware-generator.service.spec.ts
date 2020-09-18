import { TestBed } from '@angular/core/testing';

import { Cp2020CyberwareGeneratorService } from './cp2020-cyberware-generator.service';

describe('Cp2020CyberwareGeneratorService', () => {
  let service: Cp2020CyberwareGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020CyberwareGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
