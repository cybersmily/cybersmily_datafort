export class CPRedLifePathAppearance {
  hairstyle: string;
  affectations: string;
  clothing: string;

  constructor(param?: any) {
    this.hairstyle = param?param.hairstyle:'';
    this.affectations = param?param.affectations:'';
    this.clothing = param?param.clothing:'';
  }
}
