import { Cp2020Housing } from './cp2020-housing';

describe('Cp2020Housing', () => {
  describe('constructor', () => {
    it('should create an instance', () => {
      expect(new Cp2020Housing()).toBeTruthy();
    });
  });

  describe('totalCost', () => {
    it('should calculate cost', () => {
      const housing = new Cp2020Housing();
      housing.rooms = 2;
      housing.cost = 100;
      housing.qualityMod = 2;
      housing.count = 2;
      housing.utilities.push({name: 'u1', unit: '', cost: 100, count: 1});
      housing.utilities.push({name: 'u2', unit: '', cost: 100, count: 1});
      housing.utilities.push({name: 'u3', unit: '', cost: 100, count: 1});
      expect(housing.totalCost).toEqual(1400);
    });
  });

  describe('costPerUnit', () => {
    it('should calculate cost', () => {
      const housing = new Cp2020Housing();
      housing.rooms = 2;
      housing.cost = 100;
      housing.qualityMod = 2;
      housing.count = 2;
      housing.utilities.push({name: 'u1', unit: '', cost: 100, count: 1});
      housing.utilities.push({name: 'u2', unit: '', cost: 100, count: 1});
      housing.utilities.push({name: 'u3', unit: '', cost: 100, count: 1});
      expect(housing.costPerUnit).toEqual(700);
    });
  });


  describe('utilityCost', () => {
    it('should calculate cost', () => {
      const housing = new Cp2020Housing();
      housing.rooms = 2;
      housing.cost = 100;
      housing.qualityMod = 2;
      housing.count = 2;
      housing.utilities.push({name: 'u1', unit: '', cost: 100, count: 1});
      housing.utilities.push({name: 'u2', unit: '', cost: 100, count: 1});
      housing.utilities.push({name: 'u3', unit: '', cost: 100, count: 1});
      expect(housing.utilityCosts).toEqual(300);
    });
  });

});
