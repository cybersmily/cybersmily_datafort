export class Cp2020CharGenSectionSettings {
  showSkills: boolean;
  showWeapons: boolean;
  showArmor: boolean;
  showCybernetics: boolean;
  showGear: boolean;
  showCyberdeck: boolean;
  showVehicles: boolean;
  showLifestyle: boolean;
  showLifePath: boolean;
  showContacts: boolean;
  showNotes: boolean;

  constructor(param?) {
    this.showSkills = param?.showSkills ?? true;
    this.showWeapons = param?.showWeapons ?? true;
    this.showArmor = param?.showArmor ?? true;
    this.showCybernetics = param?.showCybernetics ?? true;
    this.showGear = param?.showGear ?? true;
    this.showCyberdeck = param?.showCyberdeck ?? true;
    this.showVehicles = param?.showVehicles ?? true;
    this.showLifestyle = param?.showLifestyle ?? true;
    this.showLifePath = param?.showLifePath ?? true;
    this.showContacts = param?.showContacts ?? true;
    this.showNotes = param?.showNotes ?? true;
  }
}
