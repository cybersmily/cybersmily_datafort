import { Cp2020PlayerSkill } from './cp2020-player-skill';
export class Cp2020PlayerSkills {
  RoleTotal: number;
  OtherTotal: number;
  skills: Array<Cp2020PlayerSkill>;

  rep: number;
  ip: number;

  constructor() {
    this.skills = new Array<Cp2020PlayerSkill>();
    this.initiateSkills();
    this.RoleTotal = 0;
    this.OtherTotal = 0;
    this.rep = 0;
    this.ip = 0;
  }

  importSkills(skills: Array<Cp2020PlayerSkill>){
    skills.forEach( skill => {
      const i = this.skills.findIndex( s => s.name === skill.name && s.option === skill.option);
      if(i > -1) {
        const sk = new Cp2020PlayerSkill(skill);
        sk.ipMod = this.skills[i].ipMod;
        this.skills[i] = sk;
      } else {
        this.skills.push(skill);
      }
    });
  }

  private initiateSkills() {
    // ATTR
    this.skills.push(new Cp2020PlayerSkill({name: 'Personal Grooming', ipmod: 1, stat: 'ATTR'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Wardrobe & Style', ipmod: 1, stat: 'ATTR'}));
    // BODY
    this.skills.push(new Cp2020PlayerSkill({name: 'Endurance', ipmod: 1, stat: 'BODY'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Strength Feat', ipmod: 1, stat: 'BODY'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Swimming', ipmod: 1, stat: 'BODY'}));
    // COOL
    this.skills.push(new Cp2020PlayerSkill({name: 'Interrogation', ipmod: 1, stat: 'COOL'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Intimidate', ipmod: 1, stat: 'COOL'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Oratory', ipmod: 1, stat: 'COOL'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Rhetoric', ipmod: 1, stat: 'COOL'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Resist Torture/Drugs', ipmod: 1, stat: 'COOL'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Streetwise', ipmod: 1, stat: 'COOL'}));
    // EMP
    this.skills.push(new Cp2020PlayerSkill({name: 'Animal Handler', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Human Perception', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Interview', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Leadership', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Persuasion & Fast Talk', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Perform', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Seduction', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Simper', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Social', ipmod: 1, stat: 'EMP'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Trance', ipmod: 1, stat: 'EMP'}));
    // INT
    this.skills.push(new Cp2020PlayerSkill({name: 'Accounting', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Anthrology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Astrogation', ipmod: 2, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Awareness/Notice', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Biogenetics', ipmod: 2, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Biology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Botany', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Bureaucracy', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Business Sense', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Chemistry', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Composition', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Corporate Policy', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Culture', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Diagnose Illness', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Education & Gen. Know.', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Braindance/VR', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Deep Sea Zoology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Entertainment', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Fortune Telling', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'High Tech', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Law', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Politics', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Small Arms', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Software', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Theology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Torture', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: 'Wetware', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: '', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: '', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Expert', option: '', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Gamble', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Geology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Hide/Evade', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'History', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Language', option: 'Streetspeak', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Language', option: '', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Language', option: '', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Library Search', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Mathematics', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Nuscuba', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pharmacology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Physics', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Programming', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Psychology', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Shadow/Track', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Space Survival', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Stock Market', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'System Knowledge', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Tactics', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Teaching', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Underwater Survival', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Wilderness Survival', ipmod: 1, stat: 'INT'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Zoology', ipmod: 1, stat: 'INT'}));
    // REF
    this.skills.push(new Cp2020PlayerSkill({name: 'Action Games', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Archery', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Athletics', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Brawling', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Dance', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Dodge & Escape', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Driving', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'EVA', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Fencing', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Handgun', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Heavy Weapons', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Martial Art', option: '', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Martial Art', option: '', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Martial Art', option: '', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Melee', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Motorcycle', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Operate Hvy. Machinery', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Gyro', ipmod: 3, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Hardshell', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Hovercraft', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Fixed Wing', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Drigible', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Naval Ship', ipmod: 3, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'OTV', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'PA', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Small Sub', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Spaceplane/Shuttle', ipmod: 3, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'Large Sub', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: 'VTV', ipmod: 3, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: '', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pilot', option: '', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Remote System Operation', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Rifle', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Stealth', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Street Survival', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Submachinegun', ipmod: 1, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Underwater Combat', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Underwater Heavy Weapons', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Underwater Weapons', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Zero-G Combat', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Zero-G Maneuver', ipmod: 1, stat: 'REF'}));
    // TECHnew
    this.skills.push(new Cp2020PlayerSkill({name: 'Aero Tech', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'AV Tech', ipmod: 3, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Basic Tech', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Bio Tech', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Braindance Editing', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Calligraphy', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Cryotank Operation', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Cyberdeck Design', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Cyber Tech', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Demolitions', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Disguise', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Electronics', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Elect. Security', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'ELINT', ipmod: 2, stat: 'REF'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Field Surgery', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'First Aid', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Forgery', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Gyro Tech', ipmod: 3, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Origami', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'PA Tech', ipmod: 3, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Paint or Draw', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Photo & film', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pharmaceuticals', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pick Lock', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pick Pocket', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Play Instrument', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Pressure Suit Tech', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Sonar Tech', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Sub Tech', option: 'Large', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Sub Tech', option: 'Small', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Tattooing', ipmod: 1, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Weaponsmith', ipmod: 2, stat: 'TECH'}));
    this.skills.push(new Cp2020PlayerSkill({name: 'Wetware Design', ipmod: 2, stat: 'TECH'}));
    // Other
    for ( let i = 0; i < 7; i++) {
      this.skills.push(new Cp2020PlayerSkill({name: 'Other', option: '', ipmod: 1, stat: ''}));
    }

  }

  get SkillsWithValues(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( skill => skill.value > 0);
  }

  get ATTR(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( sk => sk.stat.toLowerCase() === 'attr');
  }

  get BODY(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( sk => sk.stat.toLowerCase() === 'body');
  }

  get COOL(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat.toLowerCase() === 'cool');
  }

  get EMP(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat.toLowerCase() === 'emp');
  }

  get INT(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat.toLowerCase() === 'int');
  }

  get REF(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( sk => sk.stat.toLowerCase() === 'ref');
  }

  get TECH(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat.toLowerCase() === 'tech');
  }

  get Other(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.name.toLowerCase() === 'other');
  }

  get RoleSKills(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( sk => sk.isRoleSkill && !sk.chipped);
  }

  get RoleSKillTotal(): number {
    return this.RoleSKills.reduce( (a, b) => a + b.value, 0);
  }

  get ChippedSkills(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( sk => sk.chipped);
  }

  get NonRoleSkills(): Array<Cp2020PlayerSkill> {
    return this.skills.filter( sk => !sk.chipped && !sk.isRoleSkill);
  }

  get NonRoleSKillTotal(): number {
    return this.NonRoleSkills.reduce( (a, b) => a + b.value, 0);
  }

  getSkillForWeaponType(type: string): Array<Cp2020PlayerSkill> {
    if (!type) {
      return [];
    }
    let list = new Array<Cp2020PlayerSkill>();
    switch (type.toLowerCase()) {
      case 'p':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('handgun'));
        break;
      case 'smg':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('submachinegun'));
        break;
      case 'rif':
      case 'sht':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('rifle'));
        break;
      case 'mel':
        list = this.getPhysicalCombatSkills();
        list.unshift(
          new Cp2020PlayerSkill({ name: 'Not trained', stat: 'ref', value: 0 })
        );
        break;
      case 'hvy':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('heavy weapons'));
        break;
      default:
        list = this.getCombatSkills();
    }
    if (list.length < 1) {
      return [new Cp2020PlayerSkill({ name: 'Not trained', stat: 'ref', value: 0 })];
    }
    return list;
  }

  getPhysicalCombatSkills(): Array<Cp2020PlayerSkill> {
    return this.REF.filter(
      (s) =>
        s.name.toLowerCase() === 'melee' ||
        s.name.toLowerCase() === 'brawling' ||
        s.name.toLowerCase().toLowerCase().startsWith('martial') ||
        s.name.toLowerCase() === 'fencing'
    );

  }

  getCombatSkills(): Array<Cp2020PlayerSkill> {
    return this.REF.filter(
      (s) =>
        s.name.toLowerCase() === 'melee' ||
        s.name.toLowerCase() === 'brawling' ||
        s.name.toLowerCase().startsWith('martial')  ||
        s.name.toLowerCase() === 'fencing' ||
        s.name.toLowerCase() === 'rifle' ||
        s.name.toLowerCase() === 'pistol' ||
        s.name.toLowerCase() === 'submachinegun' ||
        s.name.toLowerCase() === 'archery' ||
        s.name.toLowerCase() === 'heavy weapons'
    );
  }

  setRoleSkills(roleSkills: any[]) {
    // set the isRoleSkill flag
    let skills = this.processRoleSkillArray(this.COOL, roleSkills);
    skills = this.processRoleSkillArray(this.EMP, skills);
    skills = this.processRoleSkillArray(this.TECH, skills);
    skills = this.processRoleSkillArray(this.BODY, skills);
    skills = this.processRoleSkillArray(this.ATTR, skills);
    skills = this.processRoleSkillArray(this.INT, skills);
    skills = this.processRoleSkillArray(this.REF, skills);
    this.addToOthers(skills);
  }

  setSecondarySkills(secondarySkills: any[]) {
    // set the isRoleSkill flag
    let skills = this.processRoleSkillArray(this.COOL, secondarySkills, true);
    skills = this.processRoleSkillArray(this.EMP, skills, true);
    skills = this.processRoleSkillArray(this.TECH, skills, true);
    skills = this.processRoleSkillArray(this.BODY, skills, true);
    skills = this.processRoleSkillArray(this.ATTR, skills, true);
    skills = this.processRoleSkillArray(this.INT, skills, true);
    skills = this.processRoleSkillArray(this.REF, skills, true);
    this.addToOthers(skills);

  }

  private processRoleSkillArray(skillArray: Array<Cp2020PlayerSkill>, roleSkills: any[], isSecondary?: boolean) {
    // clean the flags
    if (!isSecondary) {
      skillArray.map( skill => { skill.isRoleSkill = false; skill.roleChoice = false; });
    }
    // find if a role skill
    const rSkills = roleSkills.slice();
    let index = rSkills.length - 1;
    while (index >= 0) {
      if ( Array.isArray(rSkills[index])) {
        let j = rSkills[index].length - 1;
        while (j >= 0 ) {
          const found = skillArray.findIndex( s => s.name.toLowerCase() === rSkills[index][j].toLowerCase());
          if (found > -1) {
            skillArray[found].isRoleSkill = true;
            skillArray[found].roleChoice = true;
            skillArray[found].isSecondarySkill = isSecondary;
            rSkills[index].splice(j, 1);
          }
          j--;
        }
      } else {
        const found = skillArray.findIndex( s => s.name.toLowerCase() === rSkills[index].toLowerCase());
        if (found > -1) {
          skillArray[found].isRoleSkill = true;
          skillArray[found].isSecondarySkill = isSecondary;
          rSkills.splice(index, 1);
        }
      }
      index--;
    }
    return rSkills;
  }

  addToOthers(roleSkills: any[]) {
    // reset all the skills.
    this.Other.map( skill => { skill.isRoleSkill = false; skill.roleChoice = false; });
    let index = roleSkills.length - 1;
    // loop through the role array of skills.
    while (index >= 0) {
      // check if the role skill is an array of choices
      if ( Array.isArray(roleSkills[index])) {
        // loop through choices
        roleSkills[index].forEach( (sk, j) => {
          if (sk.indexOf('Expert') > -1 ) {
            this.addExpert( sk);
          } else {
            const found = this.Other.findIndex( skill => skill.option.toLowerCase() === sk.toLowerCase());
            if (found < 0) {
              const i = this.Other.findIndex( skill => skill.option === '');
              this.Other[i].option = sk;
              this.Other[i].isRoleSkill = true;
              this.Other[i].roleChoice = true;
            }
          }
        });
      } else {
        if (roleSkills[index].indexOf('Expert') > -1 ) {
          this.addExpert( roleSkills[index]);
        } else {
          const found = this.Other.findIndex( sk => sk.option.toLowerCase() === roleSkills[index].toLowerCase());
          if (found < 0) {
            const i = this.Other.findIndex( sk => sk.option === '');
            this.Other[i].option = roleSkills[index];
            this.Other[i].isRoleSkill = true;
          }
        }
      }
      index--;
    }
  }

  addSkill(skill: Cp2020PlayerSkill) {
    this.skills.push(skill);
  }
  deleteSkill(skill: Cp2020PlayerSkill) {
    const index = this.skills.findIndex(sk => {
      if (skill.option) {
        return sk.name.toLocaleLowerCase() === skill.name.toLocaleLowerCase() && sk.option.toLocaleLowerCase() === skill.option.toLocaleLowerCase();
      }
      return sk.name.toLocaleLowerCase() === skill.name.toLocaleLowerCase();
    });
    if (index > -1) {
      this.skills.splice(index, 1);
    }
  }

  addExpert( skillName: string) {
    const index = this.INT.findIndex(sk => sk.name.toLowerCase() === 'expert');
    this.INT[index].option = skillName.replace('Expert: ', '');
    this.INT[index].isRoleSkill = true;
  }

  calculateTotals() {
    this.RoleTotal = this.RoleSKillTotal;
    this.OtherTotal = this.NonRoleSKillTotal;
  }
}
