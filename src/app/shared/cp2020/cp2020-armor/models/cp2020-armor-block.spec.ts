import { Cp2020ArmorBlock } from './cp2020-armor-block';
import { Cp2020ArmorLayer } from './cp2020-armor-layer';
import { TestBed } from '@angular/core/testing';

describe('Cp2020ArmorBlock', () => {
  let armorBlock: Cp2020ArmorBlock;
  let skinweave: Cp2020ArmorLayer;
  let subdermalArmor: Cp2020ArmorLayer;
  let metalGear: Cp2020ArmorLayer;
  let heavyArmorJacket: Cp2020ArmorLayer;
  let lightArmorJacket: Cp2020ArmorLayer;
  let flakVest: Cp2020ArmorLayer;
  let flakPants: Cp2020ArmorLayer;
  let armorStockings: Cp2020ArmorLayer;
  let gibsonArmorJeans: Cp2020ArmorLayer;
  let steelHelmet: Cp2020ArmorLayer;
  let subdermalSkullArmor: Cp2020ArmorLayer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    armorBlock = new Cp2020ArmorBlock();
    skinweave = {
      name: 'Skinweave',
      head: 12, torso: 12, rarm: 12, larm: 12, rleg: 12, lleg: 12,
      isHard: false, isActive: false, ev: 0, isSkinWeave: true
    };
    subdermalArmor = {
      name: 'Subdermal Armor',
      head: 0, torso: 18, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    };
    subdermalSkullArmor = {
      name: 'Subdermal Skull Armor',
      head: 10, torso: 0, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    };
    metalGear = {
      name: 'MetalGear',
      head: 25, torso: 25, rarm: 25, larm: 25, rleg: 25, lleg: 25,
      isHard: true, isActive: false, ev: 2, isSkinWeave: false
    };
    steelHelmet = {
      name: 'Steel Helmet',
      head: 14, torso: 0, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: true, isActive: false, ev: 2, isSkinWeave: false
    };
    heavyArmorJacket = {
      name: 'Heavy Armor Jacket',
      head: 0, torso: 20, rarm: 20, larm: 20, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 2, isSkinWeave: false
    };
    lightArmorJacket = {
      name: 'Light Armor Jacket',
      head: 0, torso: 14, rarm: 14, larm: 14, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    };
    flakVest = {
      name: 'Flak Vest',
      head: 0, torso: 20, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: true, isActive: false, ev: 1, isSkinWeave: false
    };
    flakPants = {
      name: 'Flak Pants',
      head: 0, torso: 0, rarm: 0, larm: 0, rleg: 20, lleg: 20,
      isHard: true, isActive: false, ev: 1, isSkinWeave: false
    };
    armorStockings = {
      name: 'Armor Stockings',
      head: 0, torso: 0, rarm: 0, larm: 0, rleg: 6, lleg: 6,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    };
    gibsonArmorJeans = {
      name: 'Gibson Armor Jeans',
      head: 0, torso: 0, rarm: 0, larm: 0, rleg: 16, lleg: 16,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    };
  });

  it('should be created', () => {
    expect(armorBlock).toBeTruthy();
  });

  it('should add layers', () => {
    armorBlock.addLayer(skinweave);
    armorBlock.addLayer(subdermalArmor);
    armorBlock.addLayer(metalGear);
    armorBlock.addLayer(heavyArmorJacket);
    armorBlock.addLayer(lightArmorJacket);
    armorBlock.addLayer(flakVest);
    armorBlock.addLayer(flakPants);
    armorBlock.addLayer(armorStockings);
    armorBlock.addLayer(gibsonArmorJeans);
    armorBlock.addLayer(steelHelmet);
    armorBlock.addLayer(subdermalSkullArmor);
    expect(armorBlock.layers.length).toBe(11);
    expect(armorBlock.layers.filter(l => l.name === 'Flak Vest').length).toBe(1);
  });

  it('should add layers', () => {
    armorBlock.addLayer(skinweave);
    armorBlock.addLayer(subdermalArmor);
    armorBlock.addLayer(metalGear);
    armorBlock.addLayer(heavyArmorJacket);
    armorBlock.addLayer(lightArmorJacket);
    armorBlock.addLayer(flakVest);
    armorBlock.addLayer(flakPants);
    armorBlock.addLayer(armorStockings);
    armorBlock.addLayer(gibsonArmorJeans);
    armorBlock.addLayer(steelHelmet);
    armorBlock.addLayer(subdermalSkullArmor);
    expect(armorBlock.layers.length).toBe(11);
    armorBlock.removeLayer(flakVest);
    armorBlock.removeLayer(flakPants);
    expect(armorBlock.layers.length).toBe(9);
    expect(armorBlock.layers.filter(l => l.name === 'Flak Vest').length).toBe(0);
  });

  describe('Activate layers', () => {
    beforeEach(()=> {
      armorBlock.addLayer(skinweave);
      armorBlock.addLayer(subdermalArmor);
      armorBlock.addLayer(metalGear);
      armorBlock.addLayer(lightArmorJacket);
      armorBlock.addLayer(flakVest);
      armorBlock.addLayer(flakPants);
      armorBlock.addLayer(armorStockings);
      armorBlock.addLayer(gibsonArmorJeans);

      armorBlock.activateLayer(skinweave);
      armorBlock.activateLayer(subdermalArmor);
    });

    it('should activate skinweave for head', () => {
      // activate layer
      expect(armorBlock.ev).toBe(0);
      expect(armorBlock.headSP).toBe(12);
      expect(armorBlock.hasHardLayer('head')).toBeFalsy();
      expect(armorBlock.hasThreeLayer('head')).toBeFalsy();
    });
    it('should activate subdermal armor for Torso', () => {
      // activate a subdermal layer
      expect(armorBlock.ev).toBe(0);
      expect(armorBlock.torsoSP).toBe(22);
      expect(armorBlock.hasHardLayer('torso')).toBeFalsy();
      expect(armorBlock.hasThreeLayer('torso')).toBeFalsy();
    });
    it('should activate MetalGear for Head/Torso', () => {
      // activate a MetalGear
      armorBlock.activateLayer(metalGear);
      expect(armorBlock.ev).toBe(3);
      expect(armorBlock.torsoSP).toBe(30);
      expect(armorBlock.headSP).toBe(28);
      expect(armorBlock.hasHardLayer('torso')).toBeTruthy();
      expect(armorBlock.hasThreeLayer('torso')).toBeTruthy();
      expect(armorBlock.hasThreeLayer('head')).toBeFalsy();
    });
    it('should fail to activate layer due to torso', () => {
      // should fail to add
      armorBlock.activateLayer(metalGear);
      armorBlock.activateLayer(lightArmorJacket);
      expect(armorBlock.ev).toBe(3);
      expect(armorBlock.rArmSP).toBe(28);
      expect(armorBlock.torsoSP).toBe(30);
      expect(armorBlock.activeLayers.length).toBe(3);
    });
    it('should succed to activate leg layer', () => {
      // should succeed
      armorBlock.activateLayer(metalGear);
      armorBlock.activateLayer(armorStockings);
      expect(armorBlock.ev).toBe(3); // stocking shouldn't count as subdermal and metal gear is top
      expect(armorBlock.rLegSP).toBe(28);
      expect(armorBlock.activeLayers.length).toBe(4);
    });
  });

  it('should remove layer', () => {
    armorBlock.addLayer(skinweave);
    armorBlock.addLayer(subdermalArmor);
    armorBlock.addLayer(metalGear);
    armorBlock.addLayer(lightArmorJacket);
    armorBlock.addLayer(flakVest);
    armorBlock.addLayer(flakPants);
    armorBlock.addLayer(armorStockings);
    armorBlock.addLayer(gibsonArmorJeans);
    // activate layer
    armorBlock.activateLayer(skinweave);
    armorBlock.activateLayer(subdermalArmor);
    armorBlock.activateLayer(metalGear);
    armorBlock.activateLayer(armorStockings);
    armorBlock.removeLayer(subdermalArmor);
    expect(armorBlock.activeLayers.length).toBe(3);
    expect(armorBlock.ev).toBe(3);
    expect(armorBlock.torsoSP).toBe(28);
    expect(armorBlock.hasHardLayer('torso')).toBeTruthy();
    expect(armorBlock.hasThreeLayer('torso')).toBeFalsy();
    expect(armorBlock.hasThreeLayer('rleg')).toBeTruthy();
    armorBlock.removeLayer(metalGear);
    expect(armorBlock.activeLayers.length).toBe(2);
    expect(armorBlock.ev).toBe(0);
    expect(armorBlock.torsoSP).toBe(12);
    expect(armorBlock.hasHardLayer('torso')).toBeFalsy();
    expect(armorBlock.hasThreeLayer('rleg')).toBeFalsy();
  });
});
