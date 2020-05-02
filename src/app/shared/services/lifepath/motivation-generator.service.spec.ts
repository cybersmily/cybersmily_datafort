import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed, inject, async } from '@angular/core/testing';

import { MotivationGeneratorService } from './motivation-generator.service';

describe('MotivationGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      DiceService,
      DataService
    ]
  }));

  it('should be created', () => {
    const service: MotivationGeneratorService = TestBed.get(MotivationGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should have motivations', async(inject([MotivationGeneratorService], (service: MotivationGeneratorService) => {
    service.GenerateMotivation('CP2020').subscribe( data => {
      expect(data).toBeTruthy();
      expect(data.feelaboutpeople && data.feelaboutpeople !== '').toBeTruthy('Does not have feelaboutpeople property.');
      expect(data.personality && data.personality !== '').toBeTruthy('Does not have personality property.');
      expect(data.valuedperson && data.valuedperson !== '').toBeTruthy('Does not have valuedperson property.');
      expect(data.valuedpossession && data.valuedpossession !== '').toBeTruthy('Does not have valuedpossession property.');
      expect(data.valuemost && data.valuemost !== '').toBeTruthy('Does not have valuemost property.');
    });
  })));
});
