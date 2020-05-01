import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { LifePathGeneratorService } from './life-path-generator.service';

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
});
