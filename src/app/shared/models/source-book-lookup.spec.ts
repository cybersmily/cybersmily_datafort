import { SourceBookLookup } from './source-book-lookup';
import { TestBed } from '@angular/core/testing';

describe('SourceBookLookup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(SourceBookLookup).toBeTruthy();
  });

  it('should return book name', () => {
    expect(SourceBookLookup.getSource('CP').toLowerCase().startsWith('cyberpunk')).toBeTruthy();
    expect(SourceBookLookup.getSource('MM').toLowerCase().startsWith('max metal')).toBeTruthy();
    expect(SourceBookLookup.getSource('PS').toLowerCase().startsWith('protect')).toBeTruthy();
    expect(SourceBookLookup.getSource('LU').toLowerCase().startsWith('listen')).toBeTruthy();
    expect(SourceBookLookup.getSource('ES+').toLowerCase().startsWith('eurosource')).toBeTruthy();
    expect(SourceBookLookup.getSource('SF').toLowerCase().startsWith('stormfront')).toBeTruthy();
    expect(SourceBookLookup.getSource('SOF').toLowerCase().startsWith('solo of fortune')).toBeTruthy();
  });

});
