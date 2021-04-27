import { NetArchitect } from './net-architect';
import { CPRedNetArchNode } from './c-p-red-net-arch-node';
import { iconTypeSettings} from './icon-type-settings';
import { CPRedIconTypeSettings } from './c-p-red-icon-type-settings';


export class CPRedNetArchitect implements NetArchitect {
  name: string;
  description: string;
  nodes: CPRedNetArchNode;
  demons: Array<string>;
  iconSettings: iconTypeSettings;

  constructor(param?: NetArchitect) {
    this.name = param? param.name: '';
    this.description = param? param.description: '';
    this.demons = param? param.demons: new Array<string>();
    this.iconSettings = param? param.iconSettings: new CPRedIconTypeSettings();
    this.nodes = param? new CPRedNetArchNode(param.nodes): new CPRedNetArchNode();
  }
}
