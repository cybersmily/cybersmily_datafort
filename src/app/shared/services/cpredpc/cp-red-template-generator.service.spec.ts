import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
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