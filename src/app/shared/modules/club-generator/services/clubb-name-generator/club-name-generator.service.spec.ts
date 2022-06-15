import { TestBed } from '@angular/core/testing';

import { ClubNameGeneratorService } from './club-name-generator.service';

describe('ClubNameGeneratorService', () => {
  let service: ClubNameGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubNameGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
