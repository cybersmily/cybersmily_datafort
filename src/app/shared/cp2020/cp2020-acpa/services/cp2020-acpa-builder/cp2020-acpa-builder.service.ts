import { Cp2020ACPASettings } from './../../enums/cp2020-acpa-settings';
import { ACPAChassis } from './../../models/acpa-chassis';
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

  constructor() { }

  update(acpa: Cp2020ACPA) {
    this._currACPA = new Cp2020ACPA(acpa);
    this.setLocations();
    this.calculateCost();
    this.calculateWeight();
    this.calculateDamage();
    this.  calculateSIB();
    this._acpa.next(this._currACPA);
  }

  setLocations() {
    this._currACPA.locations.head.sp = this._currACPA.armor.sp;
    this._currACPA.locations.head.sdp = this._currACPA.chassis.sdp.head;
    this._currACPA.locations.head.internalSpaces = this._currACPA.chassis.spaces.head;
    this._currACPA.locations.head.externalSpaces = this._currACPA.chassis.spaces.head - 1;

    this._currACPA.locations.torso.sp = this._currACPA.armor.sp;
    this._currACPA.locations.torso.sdp = this._currACPA.chassis.sdp.torso;
    this._currACPA.locations.torso.internalSpaces = this._currACPA.chassis.spaces.torso;
    this._currACPA.locations.torso.externalSpaces = this._currACPA.chassis.spaces.torso - 1;

    this._currACPA.locations.rarm.sp = this._currACPA.armor.sp;
    this._currACPA.locations.rarm.sdp = this._currACPA.chassis.sdp.arms;
    this._currACPA.locations.rarm.internalSpaces = this._currACPA.chassis.spaces.arms;
    this._currACPA.locations.rarm.externalSpaces = this._currACPA.chassis.spaces.arms - 1;
    this._currACPA.locations.larm.sp = this._currACPA.armor.sp;
    this._currACPA.locations.larm.sdp = this._currACPA.chassis.sdp.arms;
    this._currACPA.locations.larm.internalSpaces = this._currACPA.chassis.spaces.arms;
    this._currACPA.locations.larm.externalSpaces = this._currACPA.chassis.spaces.arms - 1;

    this._currACPA.locations.rleg.sp = this._currACPA.armor.sp;
    this._currACPA.locations.rleg.sdp = this._currACPA.chassis.sdp.legs;
    this._currACPA.locations.rleg.internalSpaces = this._currACPA.chassis.spaces.legs;
    this._currACPA.locations.rleg.externalSpaces = this._currACPA.chassis.spaces.legs - 1;
    this._currACPA.locations.lleg.sp = this._currACPA.armor.sp;
    this._currACPA.locations.lleg.sdp = this._currACPA.chassis.sdp.legs;
    this._currACPA.locations.lleg.internalSpaces = this._currACPA.chassis.spaces.legs;
    this._currACPA.locations.lleg.externalSpaces = this._currACPA.chassis.spaces.legs - 1;
  }

  calculateWeight() {
    let weight = 0;
    weight += this._currACPA.chassis.weight;
    weight += this._currACPA.trooperSize;
    weight += this._currACPA.armor.weight;
    this._currACPA.totalWeight = weight;
  }

  calculateDamage() {
    let x = Math.floor(this._currACPA.chassis.str / Cp2020ACPASettings.DAMAGE_DIVISOR);
    let kick = x + Math.floor(x/2);
    let crush = x + 1;
    let bonus = '';
    let bonusD10 = 0;
    if(this._currACPA.chassis.damageMod.indexOf('D10') > 0) {
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

    this._currACPA.totalCost = cost;

  }

  calculateSIB() {
    let sib = Math.floor(this._currACPA.chassis.lift/this._currACPA.totalWeight) - 1;
    // TODO: Add VR augmentation value
    this._currACPA.sib = sib;
  }
}
