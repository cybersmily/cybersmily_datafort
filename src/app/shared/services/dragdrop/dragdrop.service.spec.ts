import { TestBed } from '@angular/core/testing';

import { DragdropService } from './dragdrop.service';

describe('DragdropService', () => {
  let service: DragdropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragdropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
