import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../../services/file-services/data.service';
import { DiceService } from '../../../services/dice/dice.service';
import { TestBed, inject } from '@angular/core/testing';

import { CpRedTemplateGeneratorService } from './cp-red-template-generator.service';

describe('CpRedTemplateGeneratorService', () => {
  let service: CpRedTemplateGeneratorService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService, DataService],
    imports: [ HttpClientModule]
  }));

  beforeEach( inject([CpRedTemplateGeneratorService], (svc: CpRedTemplateGeneratorService) => {
    service = svc;
  }));

  it('should be created',  () => {
    expect(service).toBeTruthy();
  });

  it('should generate template',  (done) => {
    service.generateCharacter('SOLO').subscribe( data => {
      expect(data).toBeTruthy();
      expect(data.role.toLowerCase()).toEqual('solo');
      done();
    });
  });
});
