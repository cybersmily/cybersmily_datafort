import { SourceBookLookup } from './source-book-lookup';
import { TestBed } from '@angular/core/testing';

describe('SourceBookLookup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(SourceBookLookup).toBeTruthy();
  });

  describe('Get Source from abbreviation', () => {
    it('should return Cyberpunk 2020', () => {
      expect(SourceBookLookup.getSource('CP').toLowerCase().startsWith('cyberpunk')).toBeTruthy(SourceBookLookup.getSource('CP'));
      expect(SourceBookLookup.getSource('CP2020').toLowerCase().startsWith('cyberpunk')).toBeTruthy(SourceBookLookup.getSource('CP'));
    });
    it('should return Chromebook 1', () => {
      expect(SourceBookLookup.getSource('CHR1').toLowerCase().startsWith('chromebook 1')).toBeTruthy();
    });
    it('should return  Chromebook 2', () => {
      expect(SourceBookLookup.getSource('CHR2').toLowerCase().startsWith('chromebook 2')).toBeTruthy();
    });
    it('should return  Chromebook 3', () => {
      expect(SourceBookLookup.getSource('CHR3').toLowerCase().startsWith('chromebook 3')).toBeTruthy();
    });
    it('should return  Chromebook 4', () => {
      expect(SourceBookLookup.getSource('CHR4').toLowerCase().startsWith('chromebook 4')).toBeTruthy();
    });
    it('should return Blackhand\'s', () => {
      expect(SourceBookLookup.getSource('BH').toLowerCase().startsWith('blackhand')).toBeTruthy();
    });
    it('should return Live and Direct', () => {
      expect(SourceBookLookup.getSource('ld').toLowerCase().includes('live')).toBeTruthy();
    });
    it('should return Wildside', () => {
      expect(SourceBookLookup.getSource('WS').toLowerCase().startsWith('wild')).toBeTruthy();
    });
    it('should return Neo Tribes', () => {
      expect(SourceBookLookup.getSource('NEO').toLowerCase().startsWith('neo tribe')).toBeTruthy();
    });
    it('should return Solo Of Fortune', () => {
      expect(SourceBookLookup.getSource('SOF').toLowerCase().startsWith('solo of fortune')).toBeTruthy();
      expect(SourceBookLookup.getSource('SOF2').toLowerCase().startsWith('solo of fortune 2')).toBeTruthy();
    });
    it('should return Hardwired', () => {
      expect(SourceBookLookup.getSource('HW').toLowerCase().startsWith('hardwired')).toBeTruthy();
    });
    it('should return Listen Up You Primitive Screwheads', () => {
      expect(SourceBookLookup.getSource('LU').toLowerCase().startsWith('listen')).toBeTruthy();
    });
    it('should return Protect & Server', () => {
      expect(SourceBookLookup.getSource('PS').toLowerCase().startsWith('protect')).toBeTruthy();
    });
    it('should return When Gravity Fails', () => {
      expect(SourceBookLookup.getSource('WGF').toLowerCase().startsWith('when gravity fails')).toBeTruthy();
    });
    it('should return Deep Space', () => {
      expect(SourceBookLookup.getSource('DS').toLowerCase().startsWith('deep space')).toBeTruthy();
    });
    it('should return Pacific Rim', () => {
      expect(SourceBookLookup.getSource('PAC').toLowerCase().startsWith('pacific rim')).toBeTruthy();
    });
    it('should return Maximum Metal', () => {
      expect(SourceBookLookup.getSource('MM').toLowerCase().startsWith('maximum metal')).toBeTruthy();
    });
    it('should return Home of the Brave', () => {
      expect(SourceBookLookup.getSource('HOB').toLowerCase().startsWith('home of the brave')).toBeTruthy();
    });
    it('should return Firestorm: Shockwave', () => {
      expect(SourceBookLookup.getSource('SW').toLowerCase().startsWith('firestorm: shockwave')).toBeTruthy();
    });
    it('should return Firestorm Stormfront', () => {
      expect(SourceBookLookup.getSource('SF').toLowerCase().includes('stormfront')).toBeTruthy();
    });
    it('should return Corpbook 1', () => {
      expect(SourceBookLookup.getSource('CB1').toLowerCase().startsWith('corpbook 1')).toBeTruthy();
    });
    it('should return Corpbook 2', () => {
      expect(SourceBookLookup.getSource('CB2').toLowerCase().startsWith('corpbook 2')).toBeTruthy();
    });
    it('should return Corpbook 3', () => {
      expect(SourceBookLookup.getSource('CB3').toLowerCase().startsWith('corpbook 3')).toBeTruthy();
    });
    it('should return Eurosource', () => {
      expect(SourceBookLookup.getSource('ES').toLowerCase().startsWith('eurosource')).toBeTruthy();
      expect(SourceBookLookup.getSource('ES+').toLowerCase().startsWith('eurosource')).toBeTruthy();
    });
    it('should return Rockerboy', () => {
      expect(SourceBookLookup.getSource('RB').toLowerCase().startsWith('rockerboy')).toBeTruthy();
    });
    it('should return Night City Guide', () => {
      expect(SourceBookLookup.getSource('NC').toLowerCase().startsWith('night city')).toBeTruthy();
    });
    it('should return R Bartmoss\'s Brain Blowout', () => {
      expect(SourceBookLookup.getSource('BB').toLowerCase().startsWith('r bartmoss')).toBeTruthy();
    });
    it('should return Rache Bartmoss\'s Guide to the NET', () => {
      expect(SourceBookLookup.getSource('NET').toLowerCase().startsWith('rache bartmoss')).toBeTruthy();
    });
    it('should return Rough Guide to the UK', () => {
      expect(SourceBookLookup.getSource('UK').toLowerCase().startsWith('rough guide to the u.k.')).toBeTruthy();
    });

    it('should return Interface', () => {
      expect(SourceBookLookup.getSource('I1.1').toLowerCase().startsWith('interface')).toBeTruthy();
      expect(SourceBookLookup.getSource('I1.2').toLowerCase().startsWith('interface')).toBeTruthy();
      expect(SourceBookLookup.getSource('I1.3').toLowerCase().startsWith('interface')).toBeTruthy();
      expect(SourceBookLookup.getSource('I1.4').toLowerCase().startsWith('interface')).toBeTruthy();
      expect(SourceBookLookup.getSource('I2.1').toLowerCase().startsWith('interface')).toBeTruthy();
      expect(SourceBookLookup.getSource('I2.2').toLowerCase().startsWith('interface')).toBeTruthy();
    });
    it('should return Land of the Free', () => {
      expect(SourceBookLookup.getSource('LOF').toLowerCase().startsWith('land of the free')).toBeTruthy();
    });
    it('should return Eurotour', () => {
      expect(SourceBookLookup.getSource('ET').toLowerCase().startsWith('eurotour')).toBeTruthy();
    });
    it('should return Forlorn Hope', () => {
      expect(SourceBookLookup.getSource('FH').toLowerCase().startsWith('forlorn hope')).toBeTruthy();
    });
    it('should return cybergeneration', () => {
      expect(SourceBookLookup.getSource('Cgen').toLowerCase().startsWith('cybergeneration')).toBeTruthy();
    });
    it('should return Edgerunner Inc.', () => {
      expect(SourceBookLookup.getSource('ER').toLowerCase().startsWith('edgerunner inc')).toBeTruthy();
    });
    it('should return ??', () => {
      expect(SourceBookLookup.getSource('AX')).toEqual('??');
      expect(SourceBookLookup.getSource('')).toEqual('');

    });
  });

  it('should return abbreviation', () => {
    expect(SourceBookLookup.getAbbrev('Cyberpunk 2020')).toEqual('CP2020');
    expect(SourceBookLookup.getAbbrev('Blackhand\'s Street')).toEqual('BH');
    expect(SourceBookLookup.getAbbrev('Chromebook 1')).toEqual('Chr1');
    expect(SourceBookLookup.getAbbrev('Chromebook 2')).toEqual('Chr2');
    expect(SourceBookLookup.getAbbrev('Chrome book 3')).toEqual('Chr3');
    expect(SourceBookLookup.getAbbrev('Chromebook 3')).toEqual('Chr3');
    expect(SourceBookLookup.getAbbrev('Chromebook3')).toEqual('Chr3');
    expect(SourceBookLookup.getAbbrev('Chromebook 4')).toEqual('Chr4');
    expect(SourceBookLookup.getAbbrev('Live \& Direct')).toEqual('LD');
    expect(SourceBookLookup.getAbbrev('Live and Direct')).toEqual('LD');
    expect(SourceBookLookup.getAbbrev('Wild side')).toEqual('WS');
    expect(SourceBookLookup.getAbbrev('Neo tribes')).toEqual('NEO');
    expect(SourceBookLookup.getAbbrev('Solo of Fortune')).toEqual('SOF');
    expect(SourceBookLookup.getAbbrev('Solo')).toEqual('SOF');
    expect(SourceBookLookup.getAbbrev('Solo of Fortune 2')).toEqual('SOF2');
    expect(SourceBookLookup.getAbbrev('Hardwire')).toEqual('HW');
    expect(SourceBookLookup.getAbbrev('Listen')).toEqual('LU');
    expect(SourceBookLookup.getAbbrev('when gravity')).toEqual('WGF');
    expect(SourceBookLookup.getAbbrev('deepspace')).toEqual('DS');
    expect(SourceBookLookup.getAbbrev('Interface 1.2')).toEqual('I1.2');
    expect(SourceBookLookup.getAbbrev('Interface 2.1')).toEqual('I2.1');
    expect(SourceBookLookup.getAbbrev('expanded rules')).toEqual('??');
  });

});
