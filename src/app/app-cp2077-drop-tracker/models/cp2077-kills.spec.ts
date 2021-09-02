import { CP2077Kills } from './cp2077-kills';

describe('CP2077KIlls', () => {
  it('should create', () => {
    const kills = new CP2077Kills();
    expect(kills).toBeTruthy();
    expect(kills.animals).toEqual(0);
  });
});
