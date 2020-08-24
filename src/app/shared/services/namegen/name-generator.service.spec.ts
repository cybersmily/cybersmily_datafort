import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { NameGeneratorService } from './name-generator.service';
import { HttpClient } from '@angular/common/http';

describe('NameGeneratorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService, DataService, HttpClient],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([NameGeneratorService], async (service: NameGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
