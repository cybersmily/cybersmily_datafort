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
    expect(SourceBookLookup.getSource('CP').toLowerCase().startsWith('cyberpunk')).toBeTruthy(SourceBookLookup.getSource('CP'));
    expect(SourceBookLookup.getSource('MM').toLowerCase().startsWith('maximum metal')).toBeTruthy(SourceBookLookup.getSource('MM'));
    expect(SourceBookLookup.getSource('PS').toLowerCase().startsWith('protect')).toBeTruthy(SourceBookLookup.getSource('PS'));
    expect(SourceBookLookup.getSource('LU').toLowerCase().startsWith('listen')).toBeTruthy(SourceBookLookup.getSource('LU'));
    expect(SourceBookLookup.getSource('ES+').toLowerCase().startsWith('eurosource')).toBeTruthy(SourceBookLookup.getSource('ES+'));
    expect(SourceBookLookup.getSource('SF').toLowerCase().includes('stormfront')).toBeTruthy(SourceBookLookup.getSource('SF'));
    expect(SourceBookLookup.getSource('SOF').toLowerCase().startsWith('solo of fortune')).toBeTruthy(SourceBookLookup.getSource('SOF'));
  });

  it('should return abbreviation', () => {
    expect(SourceBookLookup.getAbbrev('Cyberpunk 2020') === 'CP2020').toBeTruthy();
    expect(SourceBookLookup.getAbbrev('Blackhand\'s Street') === 'BH').toBeTruthy();
    expect(SourceBookLookup.getAbbrev('Chrome book 3') === 'Chr3').toBeTruthy(SourceBookLookup.getAbbrev('Chrome book 3'));
    expect(SourceBookLookup.getAbbrev('Chromebook 3') === 'Chr3').toBeTruthy(SourceBookLookup.getAbbrev('Chromebook 3'));
    expect(SourceBookLookup.getAbbrev('Chromebook3') === 'Chr3').toBeTruthy(SourceBookLookup.getAbbrev('Chromebook3'));
    expect(SourceBookLookup.getAbbrev('Live \& Direct') === 'LD').toBeTruthy(SourceBookLookup.getAbbrev('Live \& Direct'));
    expect(SourceBookLookup.getAbbrev('Live and Direct') === 'LD').toBeTruthy(SourceBookLookup.getAbbrev('Live and Direct'));
    expect(SourceBookLookup.getAbbrev('Interface 1.2') === 'I1.2').toBeTruthy();
    expect(SourceBookLookup.getAbbrev('Interface 2.1') === 'I2.1').toBeTruthy();
    expect(SourceBookLookup.getAbbrev('expanded rules') === '??').toBeTruthy();
  });

});
