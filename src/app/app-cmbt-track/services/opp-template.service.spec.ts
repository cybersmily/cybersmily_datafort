import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { TestBed } from '@angular/core/testing';

import { OppTemplateService } from './opp-template.service';

describe('OppTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      DataService
    ]
  }));

  it('should be created', () => {
    const service: OppTemplateService = TestBed.get(OppTemplateService);
    expect(service).toBeTruthy();
  });
});
