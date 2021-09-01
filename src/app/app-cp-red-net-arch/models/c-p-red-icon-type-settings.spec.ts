import { CPRedIconTypeSettings } from './c-p-red-icon-type-settings';

describe('CPRedIconTypeSettings', () => {

  let settings: CPRedIconTypeSettings;

  beforeEach(() => {
    settings = new CPRedIconTypeSettings();
  });

  it('should create an instance', () => {
    expect(settings).toBeTruthy();
  });

  describe('import()', () => {
    it('should import to string', () => {
      const testSettings = new CPRedIconTypeSettings();
      testSettings.background = 'test';
      settings.import(testSettings);
      expect(settings.background).toEqual(testSettings.background);
    });

  });

  describe('export()', () => {
    it('should export to string', () => {
      const results: string = settings.export();
      expect(typeof results).toEqual('string');
      expect(results.indexOf(settings.background)).toBeGreaterThanOrEqual(0);
    });
  });
});
