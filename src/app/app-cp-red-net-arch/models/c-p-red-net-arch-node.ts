import { NetArchProgram } from './net-arch-program';
import { NetArchNode } from './net-arch-node';

export class CPRedNetArchNode implements NetArchNode {
  id: string = '';
  type: string = 'file';
  name: string = 'file';
  desc: string = '';
  level: number = 0;
  _cost: number = 0;
  dv: number = 0;
  bgColor: string = '';
  color: string = '';
  branch: Array<CPRedNetArchNode> = new Array<CPRedNetArchNode>();
  programs?: Array<NetArchProgram>;

  constructor(param?: any) {
    if (param) {
      this.type = param.type;
      this.name = param.name;
      this.desc = param.desc;
      this.level = param.level;
      this._cost = param.cost;
      this.dv = param.dv;
      this.id = param['id'];
      this.bgColor = param?.bgColor ?? '';
      this.color = param?.color ?? '';
      param.branch?.forEach(branch => {
        this.addChild(new CPRedNetArchNode(branch));
      });
      if (param.programs) {
        this.programs = [...param.programs];
      }
    }
  }

  get cost(): number {
    if (this.programs && this.programs.length > 0) {
      return (this.programs.reduce((a, b) => a + b.cost, 0)) * this.programs.length;
    }
    return this._cost;
  }

  set cost(value: number) {
    this._cost = value;
  }

  get totalCost(): number {
    return this.branch.reduce((a, b) => a + b.totalCost, this.cost);
  }

  get numberOfBranches(): number {
    if (this.branch.length < 1) {
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
    return this.branch.reduce((a, b) => a + b.numberOfFloors, 1);
  }

  get numberOfLevels(): number {
    if (this.branch.length > 1) {
      return 1 + (this.branch[0].numberOfLevels > this.branch[1].numberOfLevels ? this.branch[0].numberOfLevels : this.branch[1].numberOfLevels);
    } else if (this.branch.length === 1) {
      return 1 + this.branch[0].numberOfLevels;
    }
    return 1;
  }

  removeChild(index: number) {
    this.branch = this.branch.splice(index, 1);
  }

  addChild(node: NetArchNode) {
    if (node) {
      node.level = this.level + 1;
      this.branch.push(new CPRedNetArchNode(node));
    }
  }

  insertChild(parentId: string, node: NetArchNode): boolean {
    if (this.id === parentId) {
      this.addChild(node);
      return true;
    } else {
      let i = 0;
      let found = false;
      do {
        found = (this.branch[i]) ? this.branch[i].insertChild(parentId, node) : undefined;
        i++;
      } while (!found && i < this.branch.length);
      return found;
    }
  }

  deleteChild(id: string): NetArchNode {
    let found: NetArchNode;
    const index = this.branch.findIndex(n => n.id === id);
    if (index > -1) {
      found = this.branch.splice(index, 1)[0];
    } else {
      for (let i = 0; i < this.branch.length; i++) {
        found = this.branch[i].deleteChild(id);
        if (found) {
          break;
        }
      }
    }
    return found;
  }

  hasChild(id: string): boolean {
    if (this.id === id) {
      return true;
    } else {
      let i = 0;
      let found = false;
      do {
        found = (this.branch[i]) ? this.branch[i].hasChild(id) : false;
        i++;
      } while (!found && i < this.branch.length);
      return found;
    }
  }

  update(node: CPRedNetArchNode) {
    if (node.id === this.id) {
      this.type = node.type;
      this.name = node.name;
      this.desc = node.desc;
      this.cost = node.cost;
      this.dv = node.dv;
      this.bgColor = node.bgColor;
      this.color = node.color;
      this.programs = node.programs;
    } else {
      if (this.branch.length > 0) {
        this.branch.forEach(n => n.update(node));
      }
    }
  }

  export(): NetArchNode {
    const result: NetArchNode = {
      type: this.type,
      name: this.name,
      desc: this.desc,
      level: this.level,
      cost: this.cost,
      dv: this.dv,
      bgColor: this.bgColor,
      color: this.color,
      branch: new Array<NetArchNode>()
    };
    this.branch.forEach(node => {
      result.branch.push(node.export());
    });
    if (this.programs) {
      result.programs = [...this.programs];
    }
    return result;
  }

  exportAsJSONString(): string {
    return JSON.stringify(this.export());
  }

}
