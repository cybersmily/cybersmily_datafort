export class Cp2020Food {
  name: string;
  quality: string;
  unit: string;
  qualityMod: number;
  count: number;
  cost: number;

  constructor(param?:Cp2020Food) {
    this.name = param?.name ?? '';
    this.quality = param?.quality ?? '';
    this.unit = param?.unit ?? '';
    this.qualityMod = param?.qualityMod ?? 1;
    this.count = param?.count ?? 1;
    this.cost = param?.cost ?? 1;
  }
}
