import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../../services/file-services';
import { DiceService } from './../../../services/dice/dice.service';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { FamilyGeneratorService } from './family-generator.service';

describe('FamilyGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService, DataService],
    imports: [ HttpClientModule]
  }));

  it('should be created', () => {
    const service: FamilyGeneratorService = TestBed.get(FamilyGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should have family', waitForAsync(inject([FamilyGeneratorService], (service: FamilyGeneratorService) => {
    service.GenerateFamily('CP2020').subscribe( data => {
      expect(data.familyBackground && data.familyBackground !== '').toBeTruthy('Does not have familyBackground.');
      expect(data.familyRanking && data.familyRanking !== '').toBeTruthy('Does not have familyBackground.');
      expect(data.siblings && data.siblings.siblings).toBeTruthy('Does not have familyBackground.');
    });
  })));
});
