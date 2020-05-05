import { MaxMetalWeapon } from './max-metal-weapon';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalWeapon', () => {
  let wpn1: MaxMetalWeapon;
  let wpn2: MaxMetalWeapon;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    // create weapon one with no frills
    wpn1 = new MaxMetalWeapon();
    wpn1.name = 'test';
    wpn1.type = 'Cannon';
    wpn1.wpntype = '';
    wpn1.wa = '0';
    wpn1.con = 'N';
    wpn1.avail = 'P';
    wpn1.ammo = {name: '20mm', damage: '20d6', costPerLoad: 20, pen: '2', spacePerLoad: 1, burst: '10'};
    wpn1.shots = '20';
    wpn1.rof = '10';
    wpn1.rel = 'VR';
    wpn1.range = 1000;
    wpn1.notes = 'test notes';
    wpn1.spaces = 1;
    wpn1.cost = 1000;
    wpn1.source = {book: 'MM', page: 50};
    wpn1.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
    wpn1.extraLoads = 0;
    wpn1.isStablized = false;
    wpn1.isAutoLoad =  false;
    wpn1.count = 1;
    wpn1.crew = 1;
    // create a new weapon with more frills
    wpn2 = new MaxMetalWeapon();
    wpn2.name = 'test2';
    wpn2.type = 'Cannon';
    wpn2.wpntype = '';
    wpn2.wa = '2';
    wpn2.con = 'N';
    wpn2.avail = 'P';
    wpn2.ammo = {name: '20mm', damage: '20d6', costPerLoad: 20, pen: '2', spacePerLoad: 1, burst: '10'};
    wpn2.shots = '40';
    wpn2.rof = '20';
    wpn2.rel = 'VR';
    wpn2.range = 2000;
    wpn2.notes = 'test notes';
    wpn2.spaces = 2;
    wpn2.cost = 2000;
    wpn2.source = {book: 'MM', page: 50};
    wpn2.mounting = {name: 'testMount', description: '', availability: '', cost: '200', spacelimit: '10', spaces: 0.5, wa: '1'};
    wpn2.extraLoads = 1;
    wpn2.isStablized = true;
    wpn2.isAutoLoad =  true;
    wpn2.count = 2;
    wpn2.crew = 1;
  });

  it('should be created', () => {
    expect(wpn1).toBeTruthy();
    expect(wpn2).toBeTruthy();
  });

  it('should copy to same object', () => {
    wpn1.copy(wpn2);
    expect(wpn1.rof === '20').toBeTruthy();
    expect(wpn1.shots === '40').toBeTruthy();
    expect(wpn1.name === 'test2').toBeTruthy();
    // stabilized and autoload should remain false.
    expect(wpn1.isStablized).toBeFalsy();
    expect(wpn1.isAutoLoad).toBeFalsy();
  });

  it('should clone object.', () => {
    const clone = wpn1.clone();
    // test to make sure they are not the same object
    clone.name = 'clone';
    wpn1.isAutoLoad = true;
    expect(clone.isAutoLoad).toBeFalsy();
    expect(wpn1.name !== 'clone').toBeTruthy();
  });

  it('should total weapon accuracy with stablized', () => {
    // should be straight wa(0).
    expect(wpn1.totalWA() === 0).toBeTruthy(wpn1.totalWA());
    // wa + stabilized (+2) + mounting (+1)
    expect(wpn2.totalWA() === 5).toBeTruthy(wpn2.totalWA());
  });

  it('should total the cost with all options added', () => {
    // cost 1000 + mounting -1( 1 * cost of weapon)
    expect(wpn1.totalCost() === 2000).toBeTruthy(wpn1.totalCost());
    // cost for wpn2
    // weapon cost(2000)
    // mount cost 200 flat (200)
    // stabilizer cost = 50% of wpn cost(2000 * 0.5 = 1000)
    // auto loader cost = 50% of wpn, minimum 25000(25000)
    // extra loads = #extraloads * ammoCostPerload(1 * 20 = 20)
    expect(wpn2.totalCost() === 28220).toBeTruthy(wpn2.totalCost());

    // set wpn2 to cost more than 50000 to stop minimum
    wpn2.cost = 75000;
    wpn2.isStablized = false;
    wpn2.extraLoads = 0;
    // weapon     (75000)
    // mount      (  200)
    // autoloader (37500) wpn * 0.5
    expect(wpn2.totalCost() === 112700).toBeTruthy(wpn2.totalCost());
  });

  it('should total the spaces with all options added', () => {
    // wpn space
    // wpn toatl = wpn space * mount spaces
    // autoloader = wpn space * 0.25
    // stablizier = wpn space * 0.5
    // extraloads = ammoLoadSpace * #extraloads

    // wpn1 = 1
    // mount = 1 * 1
    expect(wpn1.totalSpaces() === 1).toBeTruthy(wpn1.totalSpaces());

    // wpn2 = 2
    // mount = 2 * 0.5
    // wpn2 = 1
    // autoloader +0.5 (25% wpn)
    // stablizer + 1 (50% of weapon)
    // extraloads 1 (1 * 1)
    expect(wpn2.totalSpaces() === 3.5).toBeTruthy(wpn1.totalSpaces());
  });

  it('should object to string', () => {
    const str = wpn1.toString();
    expect(str.includes(wpn1.name)).toBeTruthy();
    const str2 = wpn2.toString();
    expect(str2.includes('autoloader')).toBeTruthy();
    expect(str2.includes('stabilized')).toBeTruthy();
  });

});
