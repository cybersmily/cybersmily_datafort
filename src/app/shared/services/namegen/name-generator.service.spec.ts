import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { NameGeneratorService } from './name-generator.service';

describe('NameGeneratorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService, DataService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', async(inject([NameGeneratorService], (service: NameGeneratorService) => {
    expect(service).toBeTruthy();
  })));

  it('should generate a name', async(inject([NameGeneratorService], (service: NameGeneratorService) => {
    service.generateName().subscribe(name => {
      expect(name).toBeTruthy();
      expect(name).not.toEqual('');
      expect(name.toLowerCase().includes('undefined')).toBeFalsy();
    });
  })));
});
