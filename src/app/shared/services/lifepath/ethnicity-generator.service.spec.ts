import { DiceService } from './../dice/dice.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../file-services';
import { TestBed, inject, async } from '@angular/core/testing';

import { EthnicityGeneratorService } from './ethnicity-generator.service';
import { ExpectedConditions } from 'protractor';

describe('EthnicityGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DataService, DiceService],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: EthnicityGeneratorService = TestBed.get(EthnicityGeneratorService);
    expect(service).toBeTruthy();
  });


  it('should have ethnicity', async(inject([EthnicityGeneratorService], (service: EthnicityGeneratorService) => {
    service.GenerateEthnicity('CP2020').subscribe( data => {
      expect(data.length > 0).toBeTruthy('Does not have data.');
      expect(data[0]).toBeTruthy('Does not have one ethnicity.');
      expect(data[0].name && data[0].name !== '').toBeTruthy('Ethnicity does not have a name.');
      expect(data[0].language && data[0].language !== '').toBeTruthy('Ethniticty does not have a language.');
    });
  })));
});
