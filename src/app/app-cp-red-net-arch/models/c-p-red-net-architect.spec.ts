import { CPRedIconTypeSettings } from './c-p-red-icon-type-settings';
import { CPRedNetArchNode } from './c-p-red-net-arch-node';
import { CPRedNetArchitect } from './c-p-red-net-architect';

describe('CPRedNetArchitect', () => {


  it('should create an instance', () => {
    expect(new CPRedNetArchitect()).toBeTruthy();
  });

  it('should create an instance from param', () => {
    const param = {
      name: 'test',
      description: 'test',
      nodes: new CPRedNetArchNode(),
      demons: [],
      iconSettings: new CPRedIconTypeSettings()
    };
    expect(new CPRedNetArchitect(param)).toBeTruthy();
  });


});
