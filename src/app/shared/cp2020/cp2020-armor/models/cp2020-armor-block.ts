import { Cp2020ArmorPiece } from './cp2020-armor-piece';
import { Cp2020SDPBlock } from './cp2020-sdp-block';
import { ArmorBlock } from './armor-block';
import { ProportionalSpTable } from './proportional-sp-table';

/**
 * Maximum Armor
 *  Now, in addition to Encumberance Values, only a maximum of 31ayers of Armor can
 *  be worn at any one time; no more than one of these layers can be Hard Armor
 *  (see Hard/Soft Armors Table). The 2nd layer has an extra EV penalty of -1;
 *  the 3rd layer, an add/tiona~ penalty of -2. Subdermal Armor and Bodyplating
 *  cyberwar~ options are considered to be armor layers; Skinweave is considered
 *  a layer, but receives no penalty.
 * Proportional Armor When layering armor, or wearing armor behind an obstacle
 *  or cover, subtract the smaller SP from the larger one. Find the difference
 *  on the table below and read across to the other column. This is the bonus
 *  number you add to the larger SP to determine overall protection from the
 *  armor/ armor, or armor/cover combination. If you have three or more layers
 *  of protection, calculate in pairs from the inside out. (example: For armors
 *  A, B, C, you compare A and B; determine the bonus number, and then compare
 *  the new strength of the larger of the pair to armor C.)
 * @export
 * @class Cp2020ArmorBlock
 */
export class Cp2020ArmorBlock implements ArmorBlock {
  armorPieces: Array<Cp2020ArmorPiece>;
  sdp: Cp2020SDPBlock;

  constructor(param?: any) {
    this.armorPieces = param?.armorPieces?.map(piece => piece) ?? new Array<Cp2020ArmorPiece>();
    // used for backward compatible
    if (param && Array.isArray(param.layers)) {
      param.layers.forEach(layer => {
        this.armorPieces.push(new Cp2020ArmorPiece(layer));
      });
    } else if (param && (param.head > 0
      || param.torso > 0
      || param.rarm > 0
      || param.larm > 0
      || param.rleg > 0
      || param.lleg > 0)) {
      this.armorPieces.push(new Cp2020ArmorPiece({
        name: 'Misc.',
        head: param.head, torso: param.torso,
        rarm: param.rarm, larm: param.larm,
        rleg: param.rleg, lleg: param.lleg,
        ev: 0, isHard: false, isSkinWeave: false, isActive: true
      }));
    }
    this.sdp = (param) ? new Cp2020SDPBlock(param.sdp) : new Cp2020SDPBlock();
  }


  /**
   * ev returns the total ev cost for all the layers
   *
   * @readonly
   * @type {number}
   * @memberof Cp2020ArmorBlock
   */
  get ev(): number {
    const torso = this.armorPieces.filter(l => l.locations?.torso > 0 && !l.isSkinWeave && l.isActive);
    const legs = this.armorPieces.filter(l => (l.locations?.rleg > 0 || l.locations?.lleg > 0) && !l.isSkinWeave && l.isActive);
    const arms = this.armorPieces.filter(l => (l.locations?.rarm > 0 || l.locations?.larm > 0) && !l.isSkinWeave && l.isActive);
    let armorEv = this.armorPieces.reduce(((a, b) => {
      return a + (b.isActive ? b.ev : 0);
    }), 0);
    const armor = torso.length > arms.length ? torso : (arms.length > legs.length ? arms : legs);
    armorEv += (armor.length === 2) ? 1 : (armor.length === 3) ? 3 : 0;
    return armorEv;
  }

  /**
   * get the active layers
   *
   * @readonly
   * @type {Array<Cp2020ArmorPiece>}
   * @memberof Cp2020ArmorBlock
   */
  get activePieces(): Array<Cp2020ArmorPiece> {
    return this.armorPieces.filter(l => l.isActive);
  }

  get armor(): Array<Cp2020ArmorPiece> {
    return this.armorPieces.filter(piece => piece.baseSP > 0);
  }

  get clothing(): Array<Cp2020ArmorPiece> {
    return this.armorPieces.filter(piece => piece.baseSP < 1);
  }

  addPiece(layer: Cp2020ArmorPiece) {
    if (layer.isActive && this.armorPieces.length > 2) {
      layer.isActive = false;
    }
    this.armorPieces.push(new Cp2020ArmorPiece(layer));
  }

  updatePiece(layer: Cp2020ArmorPiece, index: number) {
    if (index > -1 && index < this.armorPieces.length) {
      this.armorPieces[index] = new Cp2020ArmorPiece(layer);
    }
  }

  activatePiece(index: number) {
    if (index > -1 && index < this.armorPieces.length) {
      const layer = this.armorPieces[index];
      // verify that the new layer doesn't break rules
      const canActivate = this.ableToActivate(layer);
      if (canActivate) {
        this.armorPieces[index].isActive = true;
      }
    }
  }

  deactivatePiece(index: number) {
    this.armorPieces[index].isActive = false;
  }

  ableToActivate(layer: Cp2020ArmorPiece): boolean {
    const found = Object.keys(layer.locations).filter(location => {
      return this.hasThreeLayer(location) || (layer.isHard && this.hasHardLayer(location))
    });
    return found.length < 1;
  }


  hasThreeLayer(location: string): boolean {
    const active = this.armorPieces
      .filter(l => l.isActive && l.locations.hasOwnProperty(location));
    return (active.length >= 3);
  }

  hasHardLayer(location: string): boolean {
    return this.armorPieces.some(l => l.isActive && l.locations.hasOwnProperty(location) && l.isHard);
  }

  removePiece(layer: Cp2020ArmorPiece) {
    const index = this.armorPieces.findIndex(l => l.name === layer.name);
    this.armorPieces.splice(index, 1);
  }

  get headSP(): number {
    return this.getTotalSP('head');
  }

  get torsoSP(): number {
    return this.getTotalSP('torso');
  }

  get rArmSP(): number {
    return this.getTotalSP('rarm');
  }

  get lArmSP(): number {
    return this.getTotalSP('larm');
  }

  get rLegSP(): number {
    return this.getTotalSP('rleg');
  }

  get lLegSP(): number {
    return this.getTotalSP('lleg');
  }

  getTotalSP(location: string): number {
    const activeArmor = this.armorPieces
      .filter(l => l.isActive && l.locations?.[location])
      .sort((a, b) => a.order - b.order);

    // can't have more than 3 layers.
    if (activeArmor.length > 0) {
      let sp = 0;
      for (let i = 0; i < activeArmor.length; i++) {
        if (i < 1) {
          sp = activeArmor[i].locations[location];
        } else {
          sp = ProportionalSpTable.calculateNewSP(sp, activeArmor[i].locations[location]);
        }
      }
      return sp;
    }
    return 0;
  }

  damageSP(location: string, damage: number) {
    this.armorPieces = this.armorPieces.map(layer => {
      if (layer.locations[location] !== undefined && layer.isActive) {
        layer.locations[location] -= damage;
        layer.locations[location] = layer.locations[location] > 0 ? layer.locations[location] : 0;
      }
      return layer;
    });
  }
}
