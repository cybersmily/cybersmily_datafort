import { TestBed } from '@angular/core/testing';

import { SaveFileService } from './save-file.service';

describe('SaveFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveFileService = TestBed.get(SaveFileService);
    expect(service).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
