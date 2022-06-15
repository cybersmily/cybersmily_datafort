import { TestBed } from '@angular/core/testing';

import { ClubGeneratorService } from './club-generator.service';

describe('ClubGeneratorService', () => {
  let service: ClubGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
