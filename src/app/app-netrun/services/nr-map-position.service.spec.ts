import { TestBed } from '@angular/core/testing';

import { NrMapPositionService } from './nr-map-position.service';

describe('NrMapPositionService', () => {

  let service: NrMapPositionService;

  beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [NrMapPositionService]
  });
  service = new NrMapPositionService();
});

  it('should be created', (done) => {
    expect(service).toBeTruthy();
    service.currPosition.subscribe( pos => {
      expect(pos).toBeTruthy();
      done();
    });
  });

  it('should set position', (done) => {
    service.setPosition(2, 2);
    service.currPosition.subscribe( pos => {
      expect(pos.x).toEqual(2);
      expect(pos.y).toEqual(2);
      done();
    });
  });
});
