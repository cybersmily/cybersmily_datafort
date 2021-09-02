import { CPRedLifePathAppearance } from './c-p-red-life-path-appearance';

describe('CPRedLifePathAppearance', () => {
  let appearance: CPRedLifePathAppearance;
  beforeEach(() => {
    appearance = new CPRedLifePathAppearance();
  });

  it('should create an instance', () => {
    expect(appearance).toBeTruthy();
  });

  it('should create an instance with param', () => {
    const param = {
      hairstyle: 'mohawk',
      affectations: 'earrings',
      clothing: 'urbanflash'
    };
    appearance = new CPRedLifePathAppearance(param);
    expect(appearance).toBeTruthy();
    expect(appearance.hairstyle).toEqual(param.hairstyle);
    expect(appearance.affectations).toEqual(param.affectations);
    expect(appearance.clothing).toEqual(param.clothing);
  });
});
