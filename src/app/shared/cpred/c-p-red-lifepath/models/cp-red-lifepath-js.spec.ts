import { CPRedLifepathJumpStart } from './cp-red-lifepath-js';

describe('CPRedLifepathJumpStart', () => {
  let jsData: CPRedLifepathJumpStart;

  beforeEach(() => {
    jsData = new CPRedLifepathJumpStart();
    jsData.friends.push('friend1');
    jsData.enemies.push('enemy1');
  });

  describe('constructor()', () => {
    it('should create an instance', () => {
      expect(jsData).toBeTruthy();
    });
  });


  describe('print()', () => {
    it('should create an instance', () => {
      jsData.background = 'This is a test';
      const print = jsData.print();
      expect(print.indexOf(jsData.background)).toBeGreaterThanOrEqual(0);
    });
  });
});

