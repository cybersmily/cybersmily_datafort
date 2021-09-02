import { CPRedLifepathJumpStartData } from './cp-red-lifepath-js-data';

describe('CPRedLifepathJumpStartData', () => {
  let jsData: CPRedLifepathJumpStartData;

  beforeEach(() => {
    jsData = new CPRedLifepathJumpStartData();
  });

  describe('constructor()', () => {
    it('should create an instance', () => {
      expect(jsData).toBeTruthy();
    });
  });
});

