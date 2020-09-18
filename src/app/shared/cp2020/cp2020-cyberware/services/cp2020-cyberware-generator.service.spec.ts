import { CyberDataService } from './../../../services/data/cyber-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { TestBed, fakeAsync } from '@angular/core/testing';

import { Cp2020CyberwareGeneratorService } from './cp2020-cyberware-generator.service';

describe('Cp2020CyberwareGeneratorService', () => {
  let service: Cp2020CyberwareGeneratorService;
  let dice: DiceService;
  let data: DataService;
  let cyberData: CyberDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiceService,
        DataService,
        CyberDataService
      ]
    });
    dice = TestBed.inject(DiceService);
    data = TestBed.inject(DataService);
    cyberData = TestBed.inject(CyberDataService);
    service = new Cp2020CyberwareGeneratorService(dice, data);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
