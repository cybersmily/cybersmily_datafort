import { TestBed } from '@angular/core/testing';

import { FileLoaderService } from './file-loader.service';

describe('FileLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileLoaderService = TestBed.inject(FileLoaderService);
    expect(service).toBeTruthy();
  });
});
