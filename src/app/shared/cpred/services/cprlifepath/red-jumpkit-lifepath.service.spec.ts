import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../../services/data.service';
import { DiceService } from './../../../services//dice/dice.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { RedJumpkitLifepathService } from './red-jumpkit-lifepath.service';

describe('RedJumpkitLifepathService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService, DataService],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: RedJumpkitLifepathService = TestBed.get(RedJumpkitLifepathService);
    expect(service).toBeTruthy();
  });

});
