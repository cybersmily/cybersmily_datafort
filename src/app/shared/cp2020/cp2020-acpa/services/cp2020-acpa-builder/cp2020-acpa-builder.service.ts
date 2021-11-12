import { ACPAEnclosure } from './../../enums/acpa-enclossure';
import { StorageKeys } from './../../../../enums/storage-keys';
import { LocalStorageManagerService } from './../../../../services/local-storage-manager/local-storage-manager.service';
import { Cp2020ACPALocation } from './../../models/cp2020-acpa-location';
import { Cp2020ACPAComponent } from './../../models/cp2020-acpa-component';
import { Cp2020ACPAWeapon } from './../../models/cp2020-acpa-weapon';
import { Cp2020ACPASettings } from './../../enums/cp2020-acpa-settings';
import { Cp2020ACPA } from './../../models/cp2020-acpa';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020ACPABuilderService {
  private _acpa = new BehaviorSubject<Cp2020ACPA>(new Cp2020ACPA());
  private _currACPA = new Cp2020ACPA();
  acpa = this._acpa.asObservable();

  constructor(private localStorageManagerService: LocalStorageManagerService) {
    const acpa = JSON.parse(this.localStorageManagerService.retrive<string>(StorageKeys.ACPA_BUILDER_ACPA));
    this._currACPA = new Cp2020ACPA(acpa);
    this._acpa.next(this._currACPA);
  }

  update(acpa: Cp2020ACPA) {
    this._currACPA = new Cp2020ACPA(acpa);
    this.setLocations(acpa);
    this.calculateCost();
    this.calculateWeight();
    this.calculateDamage();
    this.calculateSIBDFB();
    this._acpa.next(this._currACPA);
    this.localStorageManagerService.store(StorageKeys.ACPA_BUILDER_ACPA, JSON.stringify(this._currACPA));
  }

  updateInterface(realityInterface: Cp2020ACPAComponent) {
    let count = 0;
    // remove the old interface with new one in head location.
    this._currACPA.locations.head.internalComponents = this._currACPA.locations.head.internalComponents
      .map((comp, i) => {
        if (comp && comp.name !== this._currACPA.realityInterface.name) {
          return comp;
        }
        if (count < realityInterface.spaces) {
          count++;
          return new Cp2020ACPAComponent(realityInterface);
        }
        return null;
      });
    this._currACPA.realityInterface = realityInterface;
    this.update(this._currACPA);
  }

  addEquipment(location: string, type: ACPAEnclosure, equip: Cp2020ACPAComponent | Cp2020ACPAWeapon) {
    if(equip.name === 'Stealthing') {
      this._currACPA.hasStealth = true;
    }
    location = location.replace(' ', '');
    if (type === ACPAEnclosure.internal) {
      const index = this._currACPA.locations[location].internalComponents.findIndex(item => item == null);
      for (let i = 0; i < equip.spaces; i++) {
        this._currACPA.locations[location].internalComponents[i + index] = equip;
      }
    } else if (type === ACPAEnclosure.external) {
      const index = this._currACPA.locations[location].externalComponents.findIndex(item => item == null);
      for (let i = 0; i < equip.spaces; i++) {
        this._currACPA.locations[location].externalComponents[i + index] = equip;
      }
    } else if (type === ACPAEnclosure.carried) {
      this._currACPA.equipment.push(equip);
    }
    this.update(this._currACPA);
  }

  removeEquipment(location: string, type: ACPAEnclosure, equip: Cp2020ACPAComponent | Cp2020ACPAWeapon) {
    if (type === ACPAEnclosure.internal) {
      const index = this._currACPA.locations[location].internalComponents.findIndex(item => item?.name === equip?.name);
      this._currACPA.locations[location].internalComponents.fill(null, index, index + equip.spaces);
    } else if (type === ACPAEnclosure.external) {
      const index = this._currACPA.locations[location].externalComponents.findIndex(item => item?.name === equip?.name);
      this._currACPA.locations[location].externalComponents.fill(null, index, index + equip.spaces);
    }
    if(equip.name === 'Stealthing') {
      this._currACPA.hasStealth = false;
    }
    this.update(this._currACPA);
  }

  removeCarriedEquipment(index: number) {
    this._currACPA.equipment.splice(index, 1);
    this.update(this._currACPA);
  }

  setLocations(acpa: Cp2020ACPA) {
    this._currACPA.locations.head = this.setLocation('head', this._currACPA.armor.sp, this._currACPA.chassis.sdp.head, this._currACPA.chassis.spaces.head, acpa.locations.head.internalComponents, acpa.locations.head.externalComponents);
    this._currACPA.locations.torso = this.setLocation('torso', this._currACPA.armor.sp, this._currACPA.chassis.sdp.torso, this._currACPA.chassis.spaces.torso, acpa.locations.torso.internalComponents, acpa.locations.torso.externalComponents);
    this._currACPA.locations.rarm = this.setLocation('arm', this._currACPA.armor.sp, this._currACPA.chassis.sdp.arms, this._currACPA.chassis.spaces.arms, acpa.locations.rarm.internalComponents, acpa.locations.rarm.externalComponents);
    this._currACPA.locations.larm = this.setLocation('arm', this._currACPA.armor.sp, this._currACPA.chassis.sdp.arms, this._currACPA.chassis.spaces.arms, acpa.locations.larm.internalComponents, acpa.locations.larm.externalComponents);
    this._currACPA.locations.rleg = this.setLocation('leg', this._currACPA.armor.sp, this._currACPA.chassis.sdp.legs, this._currACPA.chassis.spaces.legs, acpa.locations.rleg.internalComponents, acpa.locations.rleg.externalComponents);
    this._currACPA.locations.lleg = this.setLocation('leg', this._currACPA.armor.sp, this._currACPA.chassis.sdp.legs, this._currACPA.chassis.spaces.legs, acpa.locations.lleg.internalComponents, acpa.locations.lleg.externalComponents);
  }

  setLocation(name: string, sp: number, sdp: number, spaces: number, internal: Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>, external: Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>): Cp2020ACPALocation {
    const location = new Cp2020ACPALocation({
      name: name,
      sp: sp,
      sdp: sdp,
      internalSpaces: spaces,
      internalSpacesUsed: 0,
      internalComponents: new Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>(spaces * 4),
      externalSpaces: spaces - 1,
      externalSpacesUsed: 0,
      externalComponents: new Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>((spaces > 1) ? (spaces - 1) * 4 : 0),
    });
    internal.forEach((item, i) => {
      location.internalComponents[i] = item;
      location.internalSpacesUsed += item ? 0.25 : 0;
    });
    external.forEach((item, i) => {
      location.externalComponents[i] = item;
      location.externalSpacesUsed += item ? 0.25 : 0;
    });
    return location
  }

  calculateWeight() {
    let weight = 0;
    weight += this._currACPA.chassis.weight;
    weight += this._currACPA.trooperSize;
    weight += this._currACPA.armor.weight;
    weight += this._currACPA.realityInterface.weight;
    weight += this._currACPA.controlSystem.weight;
    weight += this._currACPA.locations.head.internalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.torso.internalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.rarm.internalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.larm.internalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.rleg.internalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.lleg.internalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.head.externalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.torso.externalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.rarm.externalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.larm.externalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.rleg.externalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.locations.lleg.externalComponents.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    weight += this._currACPA.equipment.reduce((a,b) => a + (b ? this.calculateItemWeight(b.weight) : 0), 0);
    this._currACPA.totalWeight = weight;
  }

  calculateDamage() {
    let x = Math.floor(this._currACPA.chassis.str / Cp2020ACPASettings.DAMAGE_DIVISOR);
    let kick = x + Math.floor(x / 2);
    let crush = x + 1;
    let bonus = '';
    let bonusD10 = 0;
    if (this._currACPA.chassis.damageMod.indexOf('D10') > 0) {
      const mod = this._currACPA.chassis.damageMod.split('D10');
      bonusD10 = Number(mod[0]);
      bonus = mod[1] ? `${mod[1]}` : '';
    } else {
      bonus = `${this._currACPA.chassis.damageMod}`;
    }
    this._currACPA.punch = `${x + bonusD10}D10${bonus}`;
    this._currACPA.kick = `${kick + bonusD10}D10${bonus}`;
    this._currACPA.crush = `${crush + bonusD10}D10${bonus}`;
  }

  calculateCost() {
    let cost = 0;
    cost += this._currACPA.chassis.cost;
    cost += this._currACPA.armor.cost;
    cost += this._currACPA.realityInterface.cost;
    cost += this._currACPA.controlSystem.cost;
    cost += this._currACPA.locations.head.internalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.torso.internalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.rarm.internalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.larm.internalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.rleg.internalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.lleg.internalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.head.externalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.torso.externalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.rarm.externalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.larm.externalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.rleg.externalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.locations.lleg.externalComponents.reduce((a,b) => a + (b ? this.calculateItemCost(b.cost) : 0), 0);
    cost += this._currACPA.equipment.reduce((a,b) => a + (b?.cost ?? 0), 0);
    if(this._currACPA.hasStealth) {
      cost = cost * 10;
    }
    this._currACPA.totalCost = cost;
  }

  calculateItemWeight(wt: number) {
    if(wt >= 0) {
      return wt;
    }
    const modifier = wt * -1;
    return Math.ceil(this._currACPA.totalWeight * modifier);
  }

  calculateItemCost(cost: number) {
    if(cost >= 0) {
      return cost;
    }
    const modifier = cost * -1;
    return Math.ceil(this._currACPA.chassis.cost * modifier);
  }

  calculateSIBDFB() {
    let sib = Math.floor(this._currACPA.chassis.lift / this._currACPA.totalWeight) - 1;
    sib += this._currACPA.realityInterface?.modifiers?.sib ?? 0;
    this._currACPA.sib = sib;
    this._currACPA.dfb = this._currACPA.realityInterface?.modifiers?.dfb ?? 0;
  }
}
