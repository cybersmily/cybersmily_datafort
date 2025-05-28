import { TestBed } from '@angular/core/testing';

import { CrCzScenarioObjectivesGeneratorService } from './cr-cz-scenario-objectives-generator.service';

describe('CrCzScenarioObjectivesGeneratorService', () => {
  let service: CrCzScenarioObjectivesGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzScenarioObjectivesGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
