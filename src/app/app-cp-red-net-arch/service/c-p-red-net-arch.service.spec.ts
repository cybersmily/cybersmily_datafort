import { DiceService } from './../../shared/services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CPRedNetArchService } from './c-p-red-net-arch.service';

describe('CPRedNetArchService', () => {
  let service: CPRedNetArchService;
  let dice: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
    service = TestBed.inject(CPRedNetArchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate architect', () => {
    service.generateArch();
    service.architect.subscribe( arch => {
    expect(arch).toBeTruthy();
  });
  });
});
