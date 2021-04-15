import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../file-services';
import { DiceService } from './../dice/dice.service';
import { TestBed, inject, async } from '@angular/core/testing';

import { LifePathGeneratorService } from './life-path-generator.service';
import { ExpectedConditions } from 'protractor';

describe('LifePathGeneratorService', () => {
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
    const service: LifePathGeneratorService = TestBed.get(LifePathGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should have motivations', async(inject([LifePathGeneratorService], (service: LifePathGeneratorService) => {
    service.generateLifePath('CP2020', false, '1').subscribe( data => {
      expect(data).toBeTruthy('Does not have data.');
      expect(data.appearance).toBeTruthy('Does not have appearance.');
      expect(data.motivations).toBeTruthy('Does not have motivations');
      expect(data.ethnicity).toBeTruthy('Does not have ethnicity.');
      expect(data.family).toBeTruthy('Does not have family');
      expect(data.events).toBeTruthy('Does not have events');
      const print = data.print();
      expect(print && print !== '').toBeTruthy('Print returns emtpy');
    });
  })));
});
