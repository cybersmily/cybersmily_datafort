import { TestBed } from '@angular/core/testing';

import { CharacterImporterService } from './character-importer.service';

describe('CharacterImporterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterImporterService = TestBed.get(CharacterImporterService);
    expect(service).toBeTruthy();
  });
});
