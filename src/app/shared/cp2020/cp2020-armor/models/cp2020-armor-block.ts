import { Cp2020ArmorLayer } from './cp2020-armor-layer';
import { ArmorLayer } from './armor-layer';
import {ArmorBlock } from './armor-block';
import {ProportionalSpTable } from './proportional-sp-table';
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
    layers: Array<Cp2020ArmorLayer>;

    constructor(param?: any) {
      this.layers = (param && param.layers) ? param.layers : new Array<Cp2020ArmorLayer>();
      // used for backward compatible
      if (param && (param.head > 0
        || param.torso > 0
        || param.rarm > 0
        || param.larm > 0
        || param.rleg > 0
        || param.lleg > 0)) {
        const newLayer = new Cp2020ArmorLayer();
        newLayer.name = 'Misc.';
        newLayer.head = param.head;
        newLayer.torso = param.torso;
        newLayer.rarm = param.rarm;
        newLayer.larm = param.larm;
        newLayer.rleg = param.rleg;
        newLayer.lleg = param.lleg;
        newLayer.ev = 0;
        newLayer.isHard = false;
        newLayer.isSkinWeave = false;
        newLayer.isActive = true;
        this.layers.push(newLayer);
      }
    }


    get ev(): number {
      const torso = this.layers.filter(l => l.torso > 0 && !l.isSkinWeave && l.isActive);
      const legs = this.layers.filter(l => (l.rleg > 0 || l.lleg > 0) && !l.isSkinWeave && l.isActive);
      const arms = this.layers.filter(l => (l.rarm > 0 || l.larm > 0) && !l.isSkinWeave && l.isActive);
      let armorEv = this.layers.reduce( ((a, b) => {
        return a + (b.isActive ? b.ev : 0);
      }), 0);
      const armor = torso.length > arms.length ? torso : (arms.length > legs.length ? arms : legs);
      armorEv += (armor.length === 2 ) ? 1 : (armor.length === 3) ? 3 : 0;
      return armorEv;
    }

    get activeLayers(): Array<Cp2020ArmorLayer> {
      return this.layers.filter(l => l.isActive);
    }

    importLayers(layers: ArmorLayer[]) {
      this.layers = new Array<Cp2020ArmorLayer>();
      layers.forEach( layer => {
        this.layers.push(new Cp2020ArmorLayer(layer));
      });
    }

    addLayer(layer: Cp2020ArmorLayer) {
      if (layer.isActive && this.layers.length > 2) {
        layer.isActive = false;
      }
      if (!this.layers.some(l => l.name === layer.name)) {
        this.layers.push(layer);
      }
    }

    activateLayer(layer: Cp2020ArmorLayer) {
      // verify that the new layer doesn't break rules
      const canActivate = (
        this.ableToActivate(layer, 'head')
        && this.ableToActivate(layer, 'torso')
        && this.ableToActivate(layer, 'rarm')
        && this.ableToActivate(layer, 'larm')
        && this.ableToActivate(layer, 'rleg')
        && this.ableToActivate(layer, 'lleg')
      );
      if (canActivate) {
        const index = this.layers.findIndex(l => l.name === layer.name);
        this.layers[index].isActive = true;
      }
    }

    deactivateLayer(layer: Cp2020ArmorLayer) {
      const index = this.layers.findIndex(l => l.name === layer.name);
      this.layers[index].isActive = false;
    }

    ableToActivate(layer: Cp2020ArmorLayer, location: string): boolean {
      if (layer[location] < 1) {
        return true;
      }
      if (this.hasThreeLayer(location)) {
        return false;
      }
      if (layer.isHard && this.hasHardLayer(location)) {
          return false;
      }
      return true;
    }


    hasThreeLayer(location: string): boolean {
      const active = this.layers.filter(l => l.isActive && l[location] > 0);
      return (active.length >= 3);
    }

    hasHardLayer(location: string): boolean {
      return this.layers.some(l => l.isActive && l[location] > 0 && l.isHard);
    }

    removeLayer(layer: Cp2020ArmorLayer) {
      const index = this.layers.findIndex(l => l.name === layer.name);
      this.layers.splice(index, 1);
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
      if (this.layers.length > 0) {
      const armor = this.layers.filter(l => l.isActive && l[location] > 0).sort( (a, b) => b[location] - a[location]);
      // can't have more than 3 layers.
      if ( armor.length < 1) {
        return 0;
      }
      let sp = armor[0][location];
      if (armor[1]) {
        const bonus = ProportionalSpTable.getBonusNumber(Math.abs(armor[1][location] - sp));
        sp += bonus;
      }
      if (armor[2]) {
        const bonus = ProportionalSpTable.getBonusNumber(Math.abs(armor[2][location] - sp));
        sp += bonus;
      }
      return sp;
    }
    return 0;
    }

    damageSP(location: string, damage: number) {
      const armor = this.layers.map( l => {
        if (l.isActive && l[location] > 0 ) {
          l[location] -= damage;
        }
        return l;
      });
    }
}
