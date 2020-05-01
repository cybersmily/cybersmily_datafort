import { DiceService } from './../dice/dice.service';
import { DataService } from './../data.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StyleGeneratorService } from './style-generator.service';

describe('StyleGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      DataService,
      DiceService
    ]
  }));

  it('should be created', () => {
    const service: StyleGeneratorService = TestBed.get(StyleGeneratorService);
    expect(service).toBeTruthy();
  });
});
