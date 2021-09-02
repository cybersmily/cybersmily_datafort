import { KeyValue } from '@angular/common';
import { CPRedLifePathFamily } from './c-p-red-life-path-family';
import { CPRedLifePathLoveaffair } from './c-p-red-life-path-loveaffair';
import { CPRedLifePathEnemy } from './c-p-red-life-path-enemy';
import { CPRedLifePathFriend } from './c-p-red-life-path-friend';
import { CPRedLifePathMotivations } from './c-p-red-life-path-motivations';
import { CPRedLifePathAppearance } from './c-p-red-life-path-appearance';
import { CPRedLifePathCulture } from './c-p-red-life-path-culture';
import { CPRedLifePathCore } from './c-p-red-life-path-core';

describe('CPRedLifePathAppearance', () => {
  let core: CPRedLifePathCore;
  let param: any;

  beforeEach(() => {
    core = new CPRedLifePathCore();
    param = {};
    param['culture'] = new CPRedLifePathCulture();
    param['appearance'] = new CPRedLifePathAppearance();
    param['motivations'] = new CPRedLifePathMotivations();
    param['friends'] = new Array<CPRedLifePathFriend>();
    param.friends.push(new CPRedLifePathFriend());
    param['enemies'] = new Array<CPRedLifePathEnemy>();
    param.enemies.push(new CPRedLifePathEnemy());
    param['loveAffairs'] = new Array<CPRedLifePathLoveaffair>();
    param.loveAffairs.push(new CPRedLifePathLoveaffair());
    param['family'] = new CPRedLifePathFamily();
    param['role'] = [{key: 'netrunner', value: 'test'}];
  });

  describe('constructor()', () => {
    it('should create an instance', () => {
      expect(core).toBeTruthy();
    });

    it('should create an instance with param', () => {
      core = new CPRedLifePathCore(param);
      expect(core).toBeTruthy();
    });
  });

  describe('print', () => {
    it('should print', () => {
      core = new CPRedLifePathCore(param);
      core.culture.name = 'european';
      core.culture.language = 'french';
      const print = core.print();
      expect(print.indexOf('european')).toBeGreaterThanOrEqual(0);
    });
  });

});
