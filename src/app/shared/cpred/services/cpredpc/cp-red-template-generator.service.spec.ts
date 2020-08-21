import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { DiceService } from '../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CpRedTemplateGeneratorService } from './cp-red-template-generator.service';

describe('CpRedTemplateGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService, DataService],
    imports: [ HttpClientModule]
  }));

  it('should be created', () => {
    const service: CpRedTemplateGeneratorService = TestBed.get(CpRedTemplateGeneratorService);
    expect(service).toBeTruthy();
  });
});
