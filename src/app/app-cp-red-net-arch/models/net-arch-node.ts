export interface NetArchNode {
  type: string;
  name: string;
  desc: string;
  level: number;
  cost: number;
  dv: number;
  bgColor: string;
  color: string;
  branch: Array<NetArchNode>;
  programs?:Array<NetArchProgram>;
}

export interface NetArchProgram {
  name: string;
  class: string;
  cost: number;
}


export class CPRedNetArchNode implements NetArchNode {
  id: string;
  type: string;
  name: string;
  desc: string;
  level: number;
  cost: number;
  dv: number;
  bgColor: string;
  color: string;
  branch: Array<CPRedNetArchNode>;
  programs?:Array<any>;

  constructor(param?: NetArchNode) {
    this.type = param ? param.type : 'file';
    this.name = param ? param.name : 'file';
    this.desc = param ? param.desc : '';
    this.level = param ? param.level : 0;
    this.cost = param ? param.cost : 0;
    this.dv = param ? param.dv : 0;
    this.id = param ?  param['id'] : '';
    this.bgColor = param ? param.bgColor : '';
    this.color = param ? param.color : '';
    this.branch = new Array<CPRedNetArchNode>();
    if (param && param.branch && param.branch.length > 0) {
      param.branch.forEach( branch => {
        this.addChild( new CPRedNetArchNode(branch));
      });
    }
  }

  get totalCost(): number {
    let result = 0;
    result = this.cost;
    result += this.branch.reduce((a, b) => a + b.totalCost, 0);
    return result;
  }

  get numberOfBranches(): number {
    if (this.branch.length < 1 ) {
      return 0;
    }
    let numOfBranches = 0;
    if (this.branch.length < 2) {
      numOfBranches += this.branch[0].numberOfBranches;
    } else {
      numOfBranches = 1;
      numOfBranches += this.branch[0].numberOfBranches;
      numOfBranches += this.branch[1].numberOfBranches;
    }
    return numOfBranches;
  }

  get numberOfFloors(): number {
    let floors = 1;
    if (this.branch.length === 1) {
      floors += this.branch[0].numberOfFloors;
    } else if(this.branch.length > 1) {
      floors += this.branch[0].numberOfFloors;
      floors += this.branch[1].numberOfFloors;
    }
    return floors;
  }

  get numberOfLevels(): number {
    if(this.branch.length > 1) {
      return 1 + ( this.branch[0].numberOfLevels > this.branch[1].numberOfLevels ? this.branch[0].numberOfLevels : this.branch[1].numberOfLevels);
    } else if(this.branch.length === 1) {
      return 1 + this.branch[0].numberOfLevels;
    }
    return 1;
  }

  removeChild(index: number) {
    this.branch = this.branch.splice(index, 1);
  }

  addChild(node: NetArchNode) {
    if(node) {
      node.level = this.level + 1;
      this.branch.push(new CPRedNetArchNode(node));
    }
  }

  insertChild(parentId: string, node: NetArchNode):boolean {
    if (this.id === parentId) {
      this.addChild(node);
      return true;
    } else {
      let i = 0;
      let found = false;
      do {
        found = (this.branch[i]) ? this.branch[i].insertChild(parentId, node) : undefined;
        i++;
      } while(!found && i < this.branch.length);
      return found;
    }
  }

  deleteChild(id: string) : NetArchNode {
    let found: NetArchNode;
    const index = this.branch.findIndex(n => n.id === id);
    if ( index > -1) {
      found = this.branch.splice(index, 1)[0];
    } else {
      for( let i = 0; i < this.branch.length; i++ ){
        found = this.branch[i].deleteChild(id);
        if(found) {
          break;
        }
      }
    }
    return found;
  }

  hasChild(id: string) : boolean {
    if (this.id === id) {
      return true;
    } else {
      let i = 0;
      let found = false;
      do {
        found = (this.branch[i]) ? this.branch[i].hasChild(id) : false;
        i++;
      } while(!found && i < this.branch.length);
      return found;
    }
  }

  update(node: CPRedNetArchNode) {
    if( node.id === this.id){
      this.type = node.type;
      this.name = node.name;
      this.desc = node.desc;
      this.cost = node.cost;
      this.dv = node.dv;
      this.bgColor = node.bgColor;
      this.color =node.color;
      return;
    } else {
      if (this.branch.length > 0) {
        this.branch.forEach( n => n.update(node));
      }
    }
    return;
  }

}


export interface iconSettings {
  color: string;
  bgColor: string;
}

export interface iconTypeSettings {
  password: iconSettings;
  controlNode: iconSettings;
  program: iconSettings;
  file: iconSettings;
  background: string;
  foreground: string;
  border: string;
}

export class CPRedIconTypeSettings implements iconTypeSettings {
  password: iconSettings;
  controlNode: iconSettings;
  program: iconSettings;
  file: iconSettings;
  background: string;
  foreground: string;
  border: string;
  key: string;

  constructor() {
    this.key = "cs-cpred-netarch-settings";
    this.password = {color: 'darkgoldenrod', bgColor: 'lightgoldenrodyellow'};
    this.controlNode = {color: 'dimgray', bgColor: 'gainsboro'};
    this.program = {color: 'darkred', bgColor: 'lightpink'};
    this.file = {color: 'green', bgColor: 'lightgreen'};
    this.background = '#DDDDDD';
    this.foreground = '#888888';
    this.border = '#a9f5bc';
  }

  import(settings: iconTypeSettings) {
    this.password = settings.password;
    this.controlNode = settings.controlNode;
    this.program = settings.program;
    this.file = settings.file;
    this.background = settings.background;
    this.foreground = settings.foreground;
    this.border = settings.border;
  }

  export(): string {
    const settings: iconTypeSettings = {
      password: this.password,
      controlNode: this.controlNode,
      program: this.program,
      file: this.file,
      background: this.background,
      foreground: this.foreground,
      border: this.border
    };
    return JSON.stringify(settings);
  }
}

export interface NetArchitect {
  name: string;
  description: string;
  nodes: NetArchNode;
  demons: Array<string>;
  iconSettings: iconTypeSettings;
}

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
