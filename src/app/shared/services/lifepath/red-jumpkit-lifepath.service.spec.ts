import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed } from '@angular/core/testing';

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
