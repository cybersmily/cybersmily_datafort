export class LifepathAppearance {
  clothes: string;
  hairstyle: string;
  affectations: string;
  constructor(param?:any) {
    this.clothes = (param && param.clothes)? param.clothes : '';
    this.hairstyle = (param && param.hairstyle)? param.hairstyle : '';
    this.affectations = (param && param.affectations)? param.affectations : '';
  }
}
