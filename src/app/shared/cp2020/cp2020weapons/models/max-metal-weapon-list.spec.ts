import { MaxMetalWeaponList } from './max-metal-weapon-list';
import { TestBed } from '@angular/core/testing';
import { MaxMetalWeapon } from './max-metal-weapon';
import { executionAsyncId } from 'async_hooks';

describe('MaxMetalWeaponList', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const wpnList: MaxMetalWeaponList = new MaxMetalWeaponList();
    expect(wpnList).toBeTruthy();
  });

  it('should add weapon', () => {
    const wpnList: MaxMetalWeaponList = new MaxMetalWeaponList();
    for (let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'gun_' + i;
      wpnList.addWeapon( wpn);
    }
    expect(wpnList.weapons.length > 0).toBeTruthy();
    expect(wpnList.weapons.length === 5).toBeTruthy();
    expect(wpnList.weapons.some( w => w.name === 'gun_2')).toBeTruthy();
    // adding guns with same name should just increase the count
    const newWpn = new MaxMetalWeapon();
    newWpn.name = 'gun_2';
    wpnList.addWeapon( newWpn);
    wpnList.addWeapon( newWpn);
    wpnList.addWeapon( newWpn);
    wpnList.addWeapon( newWpn);
    const found = wpnList.weapons.filter(w => w.name === 'gun_2');
    expect(wpnList.weapons.length === 5).toBeTruthy();
    expect(found.length === 1).toBeTruthy(found);
    expect(found[0].count === 5).toBeTruthy(found);
  });

  it('should remove weapon', () => {
    const wpnList: MaxMetalWeaponList = new MaxMetalWeaponList();
    for (let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'gun_' + i;
      wpnList.addWeapon( wpn);
    }
    const wpnDelete = new MaxMetalWeapon();
    wpnDelete.name = 'gun_2';
    wpnList.removeWeapon(wpnDelete);
    expect(wpnList.weapons.length < 5).toBeTruthy();
    expect(wpnList.weapons.some( w => w.name === 'gun_2')).toBeFalsy();

    // check the weapon count
    wpnList.addWeapon(wpnDelete);
    wpnList.addWeapon(wpnDelete);
    wpnList.addWeapon(wpnDelete);
    wpnList.removeWeapon(wpnDelete);
    const found = wpnList.weapons.filter(w => w.name === 'gun_2');
    expect(found.length === 1).toBeTruthy(found);
    expect(found[0].count === 2).toBeTruthy(found);
  });

  it('should calculate cost', () => {
    const wpnList: MaxMetalWeaponList = new MaxMetalWeaponList();
    for (let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'gun_' + i;
      wpn.cost = (i + 1) * 100;
      wpnList.addWeapon( wpn);
    }
    // gun_0 = 100
    // gun_1 = 200
    // gun_2 = 300
    // gun_3 = 400
    // gun_4 = 500
    expect(wpnList.calculateCost() === 1500).toBeTruthy();
  });

  it('should calculate space', () => {
    const wpnList: MaxMetalWeaponList = new MaxMetalWeaponList();
    for (let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'gun_' + i;
      wpn.spaces = i;
      wpn.mounting = {name: '', description: '', availability: '', cost: '', spacelimit: '10', spaces: (0.5 * i), wa: '1'};
      wpnList.addWeapon( wpn);
    }
    // gun_0 = 0 spaces (0 * (0 * 0.5))
    // gun_1 = 0.5 spaces (1 * (1 * 0.5))
    // gun_2 = 2 spaces (2 * (2 * 0.5))
    // gun_3 = 4.5 spaces (3 * (3 * 0.5))
    // gun_4 = 8 spaces (4 * (4 * 0.5))
    expect(wpnList.calculateSpace() === 15).toBeTruthy(wpnList);
  });
});
