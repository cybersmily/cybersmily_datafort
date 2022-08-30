import { ACPAWeapon } from './../../models/acpa-weapon';
import { Cp2020AcpaArmor } from './../../models/cp2020-acpa-armor';
import { Cp2020ACPAChassis } from './../../models/cp2020-acpa-chassis';
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
import { ACPA } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ACPABuilderService {
  private _acpa = new BehaviorSubject<Cp2020ACPA>(new Cp2020ACPA());
  private _currACPA = new Cp2020ACPA();
  acpa = this._acpa.asObservable();

  constructor(private localStorageManagerService: LocalStorageManagerService) {
    const storedData = this.localStorageManagerService.retrive<ACPA>(
      StorageKeys.ACPA_BUILDER_ACPA
    );
    this._currACPA = new Cp2020ACPA(storedData);
    this._acpa.next(this._currACPA);
  }

  update(acpa?: Cp2020ACPA) {
    this.calculateSIBDFB();
    this.calculateDamage();
    if (acpa) {
      this._currACPA = new Cp2020ACPA(acpa);
    }
    this._acpa.next(this._currACPA);
    this.localStorageManagerService.store(
      StorageKeys.ACPA_BUILDER_ACPA,
      JSON.stringify(this._currACPA)
    );
  }

  updateName(name: string) {
    this._currACPA.name = name;
    this.update();
  }

  updateManufacturer(name: string) {
    this._currACPA.manufacturer = name;
    this.update();
  }

  updateNote(note: string) {
    this._currACPA.notes = note;
    this.update();
  }

  updateChassis(chassis: Cp2020ACPAChassis) {
    // remove old chassis
    this.updateCostWeight(
      -this._currACPA.chassis.weight,
      -this._currACPA.chassis.cost
    );
    this._currACPA.chassis = new Cp2020ACPAChassis(chassis);
    this.updateCostWeight(
      this._currACPA.chassis.weight,
      this._currACPA.chassis.cost
    );
    this.setLocations(this._currACPA, chassis);
    if (this._currACPA.manufacturer === '') {
      this._currACPA.manufacturer = chassis.manufacturer;
    }
    this.update();
  }

  updateCostWeight(wt: number, cost: number, isCarried?: boolean) {
    if (!isNaN(wt) && isCarried) {
      this._currACPA.weightCarried += wt;
    }
    if (!isNaN(wt)) {
      this._currACPA.totalWeight += wt;
    }
    if (!isNaN(cost)) {
      this._currACPA.totalCost += cost;
    }
  }

  calculateSIBDFB() {
    let sib = this._currACPA.chassis.lift / this._currACPA.totalWeight;
    // crazy calculation from MM pg. 62 on caculating SIB. if it .8 you round up, if less than .8 round down.
    const checkDecimal = Number(sib.toString().split('.')[1]?.substring(0, 1));
    sib = Math.floor(sib);
    if (!isNaN(checkDecimal) && checkDecimal >= 8) {
      sib++;
    }
    sib--;
    sib += this._currACPA.realityInterface?.modifiers?.sib ?? 0;
    this._currACPA.sib = sib;
    this._currACPA.dfb = this._currACPA.realityInterface?.modifiers?.dfb ?? 0;
  }

  calculateDamage() {
    let x = Math.floor(
      this._currACPA.chassis.str / Cp2020ACPASettings.DAMAGE_DIVISOR
    );
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

  updateInterface(realityInterface: Cp2020ACPAComponent) {
    let count = 0;
    // remove the old interface with new one in head location.
    this.updateCostWeight(
      -this._currACPA.realityInterface.weight,
      -this._currACPA.realityInterface.cost
    );
    this._currACPA.locations.head.internalComponents =
      this._currACPA.locations.head.internalComponents.map((comp, i) => {
        if (comp && comp.name !== this._currACPA.realityInterface.name) {
          return comp;
        }
        if (count < realityInterface.spaces) {
          count++;
          return new Cp2020ACPAComponent(realityInterface);
        }
        return null;
      });
    this._currACPA.realityInterface = new Cp2020ACPAComponent(realityInterface);
    this.updateCostWeight(realityInterface.weight, realityInterface.cost);
    this.calculateSIBDFB();
    this.update();
  }

  updateControlSystem(controlSystem: Cp2020ACPAComponent) {
    this.updateCostWeight(
      -this._currACPA.controlSystem.weight,
      -this._currACPA.controlSystem.cost
    );
    this._currACPA.controlSystem = new Cp2020ACPAComponent(controlSystem);
    this.updateCostWeight(
      this._currACPA.controlSystem.weight,
      this._currACPA.controlSystem.cost
    );
    this.update();
  }

  updateArmor(armor: Cp2020AcpaArmor) {
    this.updateCostWeight(
      -this._currACPA.armor.weight,
      -this._currACPA.armor.cost
    );
    this._currACPA.armor = new Cp2020AcpaArmor(armor);
    for (const prop in this._currACPA.locations) {
      this._currACPA.locations[prop].sp = this._currACPA.armor.sp;
    }
    this.updateCostWeight(
      this._currACPA.armor.weight,
      this._currACPA.armor.cost
    );
    this.update();
  }

  updateTroopSize(weight: number) {
    this.updateCostWeight(-this._currACPA.trooperSize, 0);
    this._currACPA.trooperSize = isNaN(weight)
      ? Cp2020ACPASettings.TROOPSIZE_DEFAULT
      : weight;
    this.updateCostWeight(this._currACPA.trooperSize, 0);
    this.update();
  }

  addEquipment(
    location: string,
    type: ACPAEnclosure,
    equip: Cp2020ACPAComponent | Cp2020ACPAWeapon
  ) {
    location = location.replace(' ', '');
    let carried = false;
    if (equip?.internal === 'any|all' || equip?.external === 'any|all') {
      this.addToAllLocations(this._currACPA.locations[location], type, equip);
    } else if (
      type === ACPAEnclosure.internal ||
      type === ACPAEnclosure.external
    ) {
      this._currACPA.locations[location] = this.addComponentLocation(
        this._currACPA.locations[location],
        type,
        equip
      );
    } else {
      this._currACPA.equipment.push(equip);
      carried = true;
    }
    if (
      equip?.costMod &&
      equip.costMod.component === Cp2020ACPASettings.TOTAL_COST
    ) {
      this._currACPA.costModifier += equip.costMod.mod;
    }
    if (equip['ammo']) {
      equip.weight += equip['ammo'].weight;
      equip.cost += equip['ammo'].cost;
    }
    switch (equip?.weightMod?.component) {
      case Cp2020ACPASettings.TOTAL_WEIGHT:
        this._currACPA.weightModifier += equip.weightMod.mod;
        break;
      case Cp2020ACPASettings.CHASSIS_WEIGHT:
        equip.weight = this._currACPA.chassis.weight * equip.weightMod.mod;
        break;
      case Cp2020ACPASettings.CHASSIS_CARRY:
        equip.weight = this._currACPA.chassis.carry * equip.weightMod.mod;
        break;
    }
    this.updateCostWeight(equip.weight, equip.cost, carried);
    this.update(this._currACPA);
  }

  private addComponentLocation(
    location: Cp2020ACPALocation,
    type: ACPAEnclosure,
    equip: Cp2020ACPAComponent | Cp2020ACPAWeapon
  ): Cp2020ACPALocation {
    const loc = new Cp2020ACPALocation(location);
    const property =
      type === ACPAEnclosure.internal
        ? 'internal'
        : type === ACPAEnclosure.external
        ? 'external'
        : '';
    const components = `${property}Components`;
    const usedSpaces = `${property}SpacesUsed`;
    const index = loc[components].findIndex((item) => item == null);
    for (let i = 0; i < equip.spaces; i++) {
      const item = equip['shots']
        ? new Cp2020ACPAWeapon(equip as ACPAWeapon)
        : new Cp2020ACPAComponent(equip);
      if (i == 0) {
        const ammo = item['shots'] ? ` (${item['shots']})` : '';
        item.name = `${item.name}${ammo}`;
      } else {
        item.name = `(${item.name})`;
      }
      loc[components][i + index] = item;
    }
    loc[usedSpaces] += equip.spaces / 4;
    return loc;
  }

  private addToAllLocations(
    property: string,
    type: ACPAEnclosure,
    equip: Cp2020ACPAComponent | Cp2020ACPAWeapon
  ) {
    for (const prop in this._currACPA.locations) {
      this._currACPA.locations[prop] = this.addComponentLocation(
        this._currACPA.locations[prop],
        type,
        equip
      );
    }
  }

  private removeFromAllLocations(
    type: ACPAEnclosure,
    equip: Cp2020ACPAComponent | Cp2020ACPAWeapon
  ) {
    for (const prop in this._currACPA.locations) {
      this._currACPA.locations[prop] = this.removeLocationComponent(
        this._currACPA.locations[prop],
        type,
        equip
      );
    }
  }

  removeEquipment(
    location: string,
    type: ACPAEnclosure,
    equip: Cp2020ACPAComponent | Cp2020ACPAWeapon
  ) {
    if (equip?.internal === 'any|all' || equip?.external === 'any|all') {
      this.removeFromAllLocations(type, equip);
    } else if (
      type === ACPAEnclosure.internal ||
      type === ACPAEnclosure.external
    ) {
      this._currACPA.locations[location] = this.removeLocationComponent(
        this._currACPA.locations[location],
        type,
        equip
      );
    }
    if (
      equip?.costMod &&
      equip.costMod.component === Cp2020ACPASettings.TOTAL_COST
    ) {
      this._currACPA.costModifier -= equip.costMod.mod;
    }
    if (
      equip.weightMod &&
      equip.weightMod.component === Cp2020ACPASettings.TOTAL_WEIGHT
    ) {
      this._currACPA.weightModifier -= equip.weightMod.mod;
    }
    if (equip['ammo']) {
      equip.weight -= equip['ammo'].weight;
      equip.cost -= equip['ammo'].cost;
    }
    this.updateCostWeight(-equip.weight, -equip.cost);
    this.update(this._currACPA);
  }

  private removeLocationComponent(
    location: Cp2020ACPALocation,
    type: ACPAEnclosure,
    equip: Cp2020ACPAComponent | Cp2020ACPAWeapon
  ): Cp2020ACPALocation {
    const loc = new Cp2020ACPALocation(location);
    const property =
      type === ACPAEnclosure.internal
        ? 'internal'
        : type === ACPAEnclosure.external
        ? 'external'
        : '';
    const components = `${property}Components`;
    const usedSpaces = `${property}SpacesUsed`;
    const itemName = equip.name.startsWith('(')
      ? equip.name.replace(')', '').replace('(', '')
      : equip.name;
    const index = loc[components].findIndex((item) =>
      item?.name.includes(itemName)
    );
    loc[components].fill(null, index, index + equip.spaces);
    loc[usedSpaces] = loc[components].filter((item) => item).length / 4;
    return loc;
  }

  removeCarriedEquipment(index: number) {
    const weight = this._currACPA.equipment[index].weight;
    const cost = this._currACPA.equipment[index].cost;
    this._currACPA.equipment.splice(index, 1);
    this.updateCostWeight(-weight, -cost, true);
    this.update(this._currACPA);
  }

  private getLocationString(prop: string) {
    if (prop.includes('arm')) {
      return 'arms';
    }
    if (prop.includes('leg')) {
      return 'legs';
    }
    return prop;
  }

  setLocations(acpa: Cp2020ACPA, chassis: Cp2020ACPAChassis) {
    for (const prop in this._currACPA.locations) {
      const loc = this.getLocationString(prop);
      this._currACPA.locations[prop] = this.setLocation(
        loc,
        acpa.armor.sp,
        acpa.locations[prop].currSP,
        acpa.locations[prop].currSDP,
        chassis,
        acpa.locations[prop].internalComponents,
        acpa.locations[prop].externalComponents
      );
    }
    this.update();
  }

  private setLocation(
    location: string,
    sp: number,
    currSP: number,
    currSDP: number,
    chassis: Cp2020ACPAChassis,
    internal: Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>,
    external: Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>
  ): Cp2020ACPALocation {
    const loc = new Cp2020ACPALocation({
      name: location,
      sp: sp,
      currSP: currSP > sp ? sp : currSP < 0 ? 0 : currSP,
      sdp: chassis.sdp[location],
      currSDP:
        currSDP > chassis.sdp[location]
          ? chassis.sdp[location]
          : currSDP < 0
          ? 0
          : currSDP,
      internalSpaces: chassis.spaces[location],
      internalSpacesUsed: 0,
      internalComponents: new Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>(
        chassis.spaces[location] * 4
      ),
      externalSpaces: chassis.spaces[location] - 1,
      externalSpacesUsed: 0,
      externalComponents: new Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>(
        chassis.spaces[location] > 1 ? (chassis.spaces[location] - 1) * 4 : 0
      ),
    });
    internal.forEach((item, i) => {
      loc.internalComponents[i] = item;
      loc.internalSpacesUsed += item ? 0.25 : 0;
    });
    external.forEach((item, i) => {
      loc.externalComponents[i] = item;
      loc.externalSpacesUsed += item ? 0.25 : 0;
    });
    return loc;
  }

  calculateCost() {
    let cost = 0;
    if (this._currACPA.hasStealth) {
      cost = cost * 10;
    }
    this._currACPA.totalCost = cost;
  }

  calculateItemWeight(wt: number) {
    if (wt >= 0) {
      return wt;
    }
    const modifier = wt * -1;
    return Math.ceil(this._currACPA.totalWeight * modifier);
  }

  calculateItemCost(cost: number) {
    if (cost >= 0) {
      return cost;
    }
    const modifier = cost * -1;
    return Math.ceil(this._currACPA.chassis.cost * modifier);
  }

  toggleWad(): void {
    const servo = this.getServoComponent();
    if (this._currACPA.isWad) {
      this.updateMA(this._currACPA.ma);
      this._currACPA.ma = 5;
      this.removeEquipment('all', ACPAEnclosure.internal, servo);
      // add back trooper size
      this._currACPA.trooperSize =
        Cp2020ACPASettings.TROOPSIZE_DEFAULT.valueOf();
      this.updateCostWeight(this._currACPA.trooperSize, 0);
      this._currACPA.isWad = false;
    } else {
      this.addEquipment('all', ACPAEnclosure.internal, servo);
      // remove trooper size
      this.updateCostWeight(-this._currACPA.trooperSize, 0);
      this._currACPA.trooperSize = 0;
      this._currACPA.isWad = true;
    }
    this.update();
  }

  private getServoComponent(): Cp2020ACPAComponent {
    const servo = new Cp2020ACPAComponent();
    servo.name = 'Android Control Circuit';
    servo.spaces = 4;
    servo.weight = 5 * Object.keys(this._currACPA.locations).length;
    servo.cost = 500;
    servo.internal = 'any|all';
    return servo;
  }

  updateMA(ma: number): void {
    if (this._currACPA.isWad) {
      ma = ma < 0 ? 0 : ma > 10 ? 10 : ma;
      const maDiff = ma - this._currACPA.ma;
      this._currACPA.ma = ma;
      const modifier = maDiff * 0.1;
      const wt = 5 * Object.keys(this._currACPA.locations).length * modifier;
      const cost = 500 * modifier;
      this.updateCostWeight(wt, cost);
      this.update();
    }
  }
}
