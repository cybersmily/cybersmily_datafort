import { NetArchNode } from './net-arch-node';
import { iconTypeSettings } from './icon-type-settings';

export interface NetArchitect {
  name: string;
  description: string;
  nodes: NetArchNode;
  demons: Array<string>;
  iconSettings: iconTypeSettings;
}
