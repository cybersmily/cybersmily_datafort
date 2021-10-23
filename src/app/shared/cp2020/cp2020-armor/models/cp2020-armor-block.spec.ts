import { Cp2020ArmorPiece } from './cp2020-armor-piece';
import { Cp2020ArmorBlock } from './cp2020-armor-block';
import { TestBed } from '@angular/core/testing';

describe('Cp2020ArmorBlock', () => {
  let armorBlock: Cp2020ArmorBlock;
  let skinweave: Cp2020ArmorPiece;
  let subdermalArmor: Cp2020ArmorPiece;
  let metalGear: Cp2020ArmorPiece;
  let heavyArmorJacket: Cp2020ArmorPiece;
  let lightArmorJacket: Cp2020ArmorPiece;
  let flakVest: Cp2020ArmorPiece;
  let flakPants: Cp2020ArmorPiece;
  let armorStockings: Cp2020ArmorPiece;
  let gibsonArmorJeans: Cp2020ArmorPiece;
  let steelHelmet: Cp2020ArmorPiece;
  let subdermalSkullArmor: Cp2020ArmorPiece;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    armorBlock = new Cp2020ArmorBlock();
    skinweave = new Cp2020ArmorPiece({
      name: 'Skinweave',
      head: 12, torso: 12, rarm: 12, larm: 12, rleg: 12, lleg: 12,
      isHard: false, isActive: false, ev: 0, isSkinWeave: true
    });
    subdermalArmor = new Cp2020ArmorPiece({
      name: 'Subdermal Armor',
      head: 0, torso: 18, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    });
    subdermalSkullArmor = new Cp2020ArmorPiece({
      name: 'Subdermal Skull Armor',
      head: 10, torso: 0, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    });
    metalGear = new Cp2020ArmorPiece({
      name: 'MetalGear',
      head: 25, torso: 25, rarm: 25, larm: 25, rleg: 25, lleg: 25,
      isHard: true, isActive: false, ev: 2, isSkinWeave: false
    });
    steelHelmet = new Cp2020ArmorPiece({
      name: 'Steel Helmet',
      head: 14, torso: 0, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: true, isActive: false, ev: 2, isSkinWeave: false
    });
    heavyArmorJacket = new Cp2020ArmorPiece({
      name: 'Heavy Armor Jacket',
      head: 0, torso: 20, rarm: 20, larm: 20, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 2, isSkinWeave: false
    });
    lightArmorJacket = new Cp2020ArmorPiece({
      name: 'Light Armor Jacket',
      head: 0, torso: 14, rarm: 14, larm: 14, rleg: 0, lleg: 0,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    });
    flakVest = new Cp2020ArmorPiece({
      name: 'Flak Vest',
      head: 0, torso: 20, rarm: 0, larm: 0, rleg: 0, lleg: 0,
      isHard: true, isActive: false, ev: 1, isSkinWeave: false
    });
    flakPants = new Cp2020ArmorPiece({
      name: 'Flak Pants',
      head: 0, torso: 0, rarm: 0, larm: 0, rleg: 20, lleg: 20,
      isHard: true, isActive: false, ev: 1, isSkinWeave: false
    });
    armorStockings = new Cp2020ArmorPiece({
      name: 'Armor Stockings',
      head: 0, torso: 0, rarm: 0, larm: 0, rleg: 6, lleg: 6,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    });
    gibsonArmorJeans = new Cp2020ArmorPiece({
      name: 'Gibson Armor Jeans',
      head: 0, torso: 0, rarm: 0, larm: 0, rleg: 16, lleg: 16,
      isHard: false, isActive: false, ev: 0, isSkinWeave: false
    });
  });

  it('should be created', () => {
    expect(armorBlock).toBeTruthy();
  });

  it('should add layers', () => {
    armorBlock.addPiece(skinweave);
    armorBlock.addPiece(subdermalArmor);
    armorBlock.addPiece(metalGear);
    armorBlock.addPiece(heavyArmorJacket);
    armorBlock.addPiece(lightArmorJacket);
    armorBlock.addPiece(flakVest);
    armorBlock.addPiece(flakPants);
    armorBlock.addPiece(armorStockings);
    armorBlock.addPiece(gibsonArmorJeans);
    armorBlock.addPiece(steelHelmet);
    armorBlock.addPiece(subdermalSkullArmor);
    expect(armorBlock.armorPieces.length).toBe(11);
    expect(armorBlock.armorPieces.filter(l => l.name === 'Flak Vest').length).toBe(1);
  });

  it('should add layers', () => {
    armorBlock.addPiece(skinweave);
    armorBlock.addPiece(subdermalArmor);
    armorBlock.addPiece(metalGear);
    armorBlock.addPiece(heavyArmorJacket);
    armorBlock.addPiece(lightArmorJacket);
    armorBlock.addPiece(flakVest);
    armorBlock.addPiece(flakPants);
    armorBlock.addPiece(armorStockings);
    armorBlock.addPiece(gibsonArmorJeans);
    armorBlock.addPiece(steelHelmet);
    armorBlock.addPiece(subdermalSkullArmor);
    expect(armorBlock.armorPieces.length).toBe(11);
    armorBlock.removePiece(flakVest);
    armorBlock.removePiece(flakPants);
    expect(armorBlock.armorPieces.length).toBe(9);
    expect(armorBlock.armorPieces.filter(l => l.name === 'Flak Vest').length).toBe(0);
  });

  describe('Activate layers', () => {
    beforeEach(()=> {
      armorBlock.addPiece(skinweave);
      armorBlock.addPiece(subdermalArmor);
      armorBlock.addPiece(metalGear);
      armorBlock.addPiece(lightArmorJacket);
      armorBlock.addPiece(flakVest);
      armorBlock.addPiece(flakPants);
      armorBlock.addPiece(armorStockings);
      armorBlock.addPiece(gibsonArmorJeans);

      armorBlock.activatePiece(skinweave);
      armorBlock.activatePiece(subdermalArmor);
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
      armorBlock.activatePiece(metalGear);
      expect(armorBlock.ev).toBe(3);
      expect(armorBlock.torsoSP).toBe(30);
      expect(armorBlock.headSP).toBe(28);
      expect(armorBlock.hasHardLayer('torso')).toBeTruthy();
      expect(armorBlock.hasThreeLayer('torso')).toBeTruthy();
      expect(armorBlock.hasThreeLayer('head')).toBeFalsy();
    });
    it('should fail to activate layer due to torso', () => {
      // should fail to add
      armorBlock.activatePiece(metalGear);
      armorBlock.activatePiece(lightArmorJacket);
      expect(armorBlock.ev).toBe(3);
      expect(armorBlock.rArmSP).toBe(28);
      expect(armorBlock.torsoSP).toBe(30);
      expect(armorBlock.activePiece.length).toBe(3);
    });
    it('should succed to activate leg layer', () => {
      // should succeed
      armorBlock.activatePiece(metalGear);
      armorBlock.activatePiece(armorStockings);
      expect(armorBlock.ev).toBe(3); // stocking shouldn't count as subdermal and metal gear is top
      expect(armorBlock.rLegSP).toBe(28);
      expect(armorBlock.activePiece.length).toBe(4);
    });
  });

  it('should remove layer', () => {
    armorBlock.addPiece(skinweave);
    armorBlock.addPiece(subdermalArmor);
    armorBlock.addPiece(metalGear);
    armorBlock.addPiece(lightArmorJacket);
    armorBlock.addPiece(flakVest);
    armorBlock.addPiece(flakPants);
    armorBlock.addPiece(armorStockings);
    armorBlock.addPiece(gibsonArmorJeans);
    // activate layer
    armorBlock.activatePiece(skinweave);
    armorBlock.activatePiece(subdermalArmor);
    armorBlock.activatePiece(metalGear);
    armorBlock.activatePiece(armorStockings);
    armorBlock.removePiece(subdermalArmor);
    expect(armorBlock.activePiece.length).toBe(3);
    expect(armorBlock.ev).toBe(3);
    expect(armorBlock.torsoSP).toBe(28);
    expect(armorBlock.hasHardLayer('torso')).toBeTruthy();
    expect(armorBlock.hasThreeLayer('torso')).toBeFalsy();
    expect(armorBlock.hasThreeLayer('rleg')).toBeTruthy();
    armorBlock.removePiece(metalGear);
    expect(armorBlock.activePiece.length).toBe(2);
    expect(armorBlock.ev).toBe(0);
    expect(armorBlock.torsoSP).toBe(12);
    expect(armorBlock.hasHardLayer('torso')).toBeFalsy();
    expect(armorBlock.hasThreeLayer('rleg')).toBeFalsy();
  });
});
