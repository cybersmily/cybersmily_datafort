import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models/cp2020-armor-block';
import { Cp2020StatBlock } from './../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { jsPDF } from 'jspdf';
import { Cp2020PlayerCharacter } from '../cp2020character';
import { PdfFontSize, PdfPageSettings } from '../../enums';
import { Cp2020PlayerSkill } from '../../cp2020/cp2020-skills/models';
import { CpPlayerWeaponList } from '../../cp2020/cp2020weapons/models';
import { CmbtTrckOpponent } from '../cmbt-trck';

export class Cp2020CharacterToFandDPDF {
  private _character: Cp2020PlayerCharacter;
  private _font: string;
  private _fontSize: number = PdfFontSize.DEFAULT;
  private _spacer: number = 3;

  generateFastAndDirtyCombatTrackerOppPdf(
    opponents: Array<CmbtTrckOpponent>
  ): void {
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);
    let line = PdfPageSettings.MARGIN_TOP.valueOf();
    let leftMargin = PdfPageSettings.MARGIN_LEFT.valueOf();
    const startLine = line;

    opponents.forEach((opp, index) => {
      const beginLine = line;
      line = this.createNameAndRole(doc, line, leftMargin, opp.name, opp.role);
      line += 2;
      line = this.createStats(doc, line, leftMargin, opp.stats);
      line += 2;
      line = this.createArmorSection(doc, line, leftMargin, opp.armor);
      line = this.createSaveWoundsSection(
        doc,
        line,
        leftMargin,
        opp.stats.Save.toString(),
        opp.stats.BTM.toString()
      );
      line += 2;
      line = this.createCyberSection(
        doc,
        line,
        leftMargin,
        opp.cyberware.map((cyber) => cyber.name)
      );
      line += this._spacer;
      line = this.createSpecialAbilityAndSkills(
        doc,
        line,
        leftMargin,
        opp.sa,
        opp.skills
      );
      line +=  this._spacer;
      line = this.createWeapons(doc, line, leftMargin, opp.getWeaponsAsList());
      line += this._spacer;
      line = this.createPossessions(doc, line, leftMargin, opp.gear);

      doc.setFillColor('Black');
      doc.setDrawColor('Black');
      doc.setTextColor('White');
      doc.rect(
        leftMargin - 2,
        beginLine - 2,
        98,
        PdfPageSettings.PAGE_HEIGHT / 2,
        'S'
      );
      if(index%2 === 0) {
        line = beginLine;
        leftMargin = PdfPageSettings.MIDPAGE.valueOf() + 2
      } else {
        line = beginLine + (PdfPageSettings.PAGE_HEIGHT / 2) + 4;
        leftMargin = PdfPageSettings.MARGIN_LEFT.valueOf();
      }
      if(line > PdfPageSettings.PAGE_HEIGHT){
        doc.addPage();
        line =  PdfPageSettings.MARGIN_TOP.valueOf();
      }
    });


    doc.save(`CP2020_FastNDirty_Sheet.pdf`);
  }

  generateFastAndDirtyPlayerCharacerPdf(
    character: Cp2020PlayerCharacter
  ): void {
    this._character = character;
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);
    let line = PdfPageSettings.MARGIN_TOP.valueOf();
    let leftMargin = PdfPageSettings.MARGIN_LEFT.valueOf();
    this.createCharacter(doc, line, leftMargin, character);

    doc.save(`CP2020_FastNDirty_Sheet.pdf`);
  }

  private createCharacter(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    character: Cp2020PlayerCharacter
  ): number {
    const startLine = line;
    line = this.createNameAndRole(
      doc,
      line,
      leftMargin,
      this._character.handle,
      this._character.role.name
    );
    line += 2;
    line = this.createStats(doc, line, leftMargin, this._character.stats);
    line += 2;
    line = this.createArmorSection(doc, line, leftMargin, character.armor);
    line = this.createSaveWoundsSection(
      doc,
      line,
      leftMargin,
      character.stats.Save.toString(),
      character.stats.BTM.toString()
    );
    line += 2;
    const cyber = this._character.cyberware.items.map((cyber) => cyber.name);
    line = this.createCyberSection(doc, line, leftMargin, cyber);
    line +=  this._spacer;
    line = this.createSpecialAbilityAndSkills(
      doc,
      line,
      leftMargin,
      character.skills.SkillsWithValues.filter(sk => sk.isSA),
      character.skills.SkillsWithValues.filter(sk => !sk.isSA)
    );
    line +=  this._spacer;
    line = this.createWeapons(doc, line, leftMargin, character.weapons);
    line +=  this._spacer;
    let gear: Array<string> = character.gear.items
      .map((gear) => gear.gear)
      .sort();
    line = this.createPossessions(doc, line, leftMargin, gear);

    doc.setFillColor('Black');
    doc.setDrawColor('Black');
    doc.setTextColor('White');
    doc.rect(
      leftMargin - 2,
      startLine - 2,
      PdfPageSettings.MIDPAGE.valueOf(),
      PdfPageSettings.PAGE_HEIGHT / 2,
      'S'
    );
    return line;
  }

  private setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm',
    });
    // verify that Arial is a font.
    this._font = this.getFont(doc.getFontList());
    doc.setFont(this._font);
    doc.setFontSize(this._fontSize);
    return doc;
  }

  private getFont(fonts: any): string {
    if (fonts['Arial']) {
      return 'Arial';
    }
    if (fonts['Helvetica']) {
      return 'Helvetica';
    }
    if (fonts['Verdana']) {
      return 'Verdana';
    }
    if (fonts['sans-serif']) {
      return 'sans-serif';
    }
    if (fonts['times']) {
      return 'times';
    }
    return 'courier';
  }

  private createNameAndRole(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    name: string,
    role: string
  ): number {
    doc.setFillColor('Black');
    doc.setDrawColor('Black');
    doc.setTextColor('White');
    doc.rect(leftMargin, line, 13, 5, 'DF');
    doc.rect(leftMargin + 60, line, 13, 5, 'DF');
    doc.text('NAME', leftMargin + 1, line + 4);
    doc.text('ROLE', leftMargin + 61, line + 4);
    doc.setFillColor('White');
    doc.setTextColor('Black');
    doc.rect(leftMargin + 14, line, 45, 5, 'S');
    doc.rect(leftMargin + 74, line, 20, 5, 'S');
    doc.text(name.substring(0, 20), leftMargin + 15, line + 4);
    doc.text(role.substring(0, 10), leftMargin + 75, line + 4);
    line += 5;

    return line;
  }

  private createStats(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    stats: Cp2020StatBlock
  ): number {
    doc.setFillColor('Black');
    doc.setDrawColor('Black');
    doc.setTextColor('White');
    doc.rect(leftMargin, line, 15, 5, 'DF');
    doc.text('STATS', leftMargin + 1, line + 4);
    line += 5;
    doc.setFillColor('White');
    doc.setTextColor('Black');
    doc.text(`INT [${stats.INT.Adjusted}]`, leftMargin + 1, line + 4);
    doc.text(`REF [${stats.REF.Adjusted}]`, leftMargin + 25, line + 4);
    doc.text(`TECH [${stats.TECH.Adjusted}]`, leftMargin + 48, line + 4);
    doc.text(`COOL [${stats.COOL.Adjusted}]`, leftMargin + 72, line + 4);
    line += 4;
    doc.text(`ATTR [${stats.ATTR.Adjusted}]`, leftMargin + 1, line + 4);
    doc.text(`LUCK [${stats.LUCK.Adjusted}]`, leftMargin + 25, line + 4);
    doc.text(`MA [${stats.MA.Adjusted}]`, leftMargin + 48, line + 4);
    doc.text(`BODY [${stats.BODY.Adjusted}]`, leftMargin + 72, line + 4);

    line += 4;
    doc.text(`EMP [${stats.EMP.Adjusted}]`, leftMargin + 1, line + 4);
    doc.text(`Run [${stats.Run}m]`, leftMargin + 25, line + 4);
    doc.text(`Leap [${stats.Leap}m]`, leftMargin + 48, line + 4);
    doc.text(`Lift [${stats.Lift}kg]`, leftMargin + 72, line + 4);

    line += 4;
    return line;
  }

  private createArmorSection(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    armor: Cp2020ArmorBlock
  ): number {
    doc.setFillColor('Black');
    doc.setDrawColor('Black');
    doc.setTextColor('White');
    doc.rect(leftMargin, line, 20, 8, 'DF');
    doc.rect(leftMargin, line + 9, 20, 5, 'DF');
    doc.text('Location', leftMargin + 1, line + 4);
    doc.text('Armor SP', leftMargin + 1, line + 13);

    this.drawLocation(
      doc,
      line,
      leftMargin + 21,
      'Head',
      '1',
      armor.headSP.toString()
    );
    this.drawLocation(
      doc,
      line,
      leftMargin + 33,
      'Torso',
      '2-4',
      armor.torsoSP.toString()
    );
    this.drawLocation(
      doc,
      line,
      leftMargin + 45,
      'RArm',
      '5',
      armor.rArmSP.toString()
    );
    this.drawLocation(
      doc,
      line,
      leftMargin + 57,
      'LArm',
      '6',
      armor.lArmSP.toString()
    );
    this.drawLocation(
      doc,
      line,
      leftMargin + 69,
      'RLeg',
      '7-8',
      armor.rLegSP.toString()
    );
    this.drawLocation(
      doc,
      line,
      leftMargin + 81,
      'LLeg',
      '9-0',
      armor.lLegSP.toString()
    );

    line += 15;
    doc.setFillColor('White');
    doc.setTextColor('Black');
    return line;
  }

  private drawLocation(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    location: string,
    die: string,
    sp: string
  ): void {
    doc.setDrawColor('Black');
    doc.setTextColor('Black');
    doc.rect(leftMargin, line, 12, 9, 'S');
    doc.rect(leftMargin, line + 9, 12, 5, 'S');
    doc.setFontSize(PdfFontSize.SM);
    doc.text(location, leftMargin + 6, line + 3, { align: 'center' });
    doc.text(die, leftMargin + 6, line + 7, { align: 'center' });
    doc.text(sp, leftMargin + 6, line + 13, { align: 'center' });
  }

  private createSaveWoundsSection(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    save: string,
    btm: string
  ): number {
    doc.rect(leftMargin, line, 12, 7, 'S');
    doc.text('SAVE', leftMargin + 6, line + 5, {align: 'center'});
    doc.rect(leftMargin, line + 7, 12, 12, 'S');
    doc.text(save.toString(), leftMargin + 6, line + 13, {align: 'center'});

    const left = leftMargin + 14;
    doc.rect(left, line, 12, 7, 'S');
    doc.rect(left, line + 7, 12, 12, 'S');
    doc.text('BTM', left + 6, line + 5, {align: 'center'});
    doc.text(btm.toString(), left + 6, line + 13, {align: 'center'});
    doc.setFont(this._font, 'normal');
    const woundWidth = 12;
    this.addWounds(doc, 'LIGHT', 0, line + 1, left + 14, woundWidth);
    this.addWounds(doc, 'SERIOUS', -1, line + 1, left + 26, woundWidth);
    this.addWounds(doc, 'CRITICAL', -2, line + 1, left + 38, woundWidth);
    this.addWounds(doc, 'MORTAL0', -3, line + 1, left + 50, woundWidth);
    this.addWounds(doc, 'MORTAL1', -4, line + 1, left + 62, woundWidth);

    this.addWounds(doc, 'MORTAL2', -5, line + 11, left + 14, woundWidth);
    this.addWounds(doc, 'MORTAL3', -6, line + 11, left + 26, woundWidth);
    this.addWounds(doc, 'MORTAL4', -7, line + 11, left + 38, woundWidth);
    this.addWounds(doc, 'MORTAL5', -8, line + 11, left + 50, woundWidth);
    this.addWounds(doc, 'MORTAL6', -9, line + 11, left + 62, woundWidth);
    line += 22;
    return line;
  }

  private addWounds(
    doc: jsPDF,
    level: string,
    stun: number,
    line: number,
    left: number,
    width: number
  ) {
    doc.setFontSize(6);
    const center = left + width / 2;
    doc.text(level, center, line, { align: 'center' });
    line = line + 1;
    doc.setFontSize(7);
    doc.rect(center - 4, line, 2, 2, 'S');
    doc.rect(center - 2, line, 2, 2, 'S');
    doc.rect(center, line, 2, 2, 'S');
    doc.rect(center + 2, line, 2, 2, 'S');
    line = line + 2.4;
    doc.rect(left, line, width, 4, 'DF');
    doc.setTextColor('white');
    doc.text(`Stun=${stun}`, left + 1, line + 2.5);
    doc.setTextColor('black');
    doc.setFontSize(this._fontSize);
  }

  private createCyberSection(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    cyberware: Array<string>
  ): number {
    doc.setFontSize(PdfFontSize.SM);
    doc.setTextColor('Black');
    const list = `Cybernetics:   ${cyberware.join('; ')}`;
    const output: Array<string> = doc.splitTextToSize(list, 90);
    output.forEach((row) => {
      doc.text(row, leftMargin, line);
      line += 3.5;
    });
    doc.setDrawColor('Dark Gray');
    doc.line(leftMargin, line - 1, leftMargin + 90, line - 1);

    doc.setDrawColor('Black');
    doc.setFontSize(PdfFontSize.DEFAULT);
    return line;
  }

  private createSpecialAbilityAndSkills(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    specialAbilites: Array<Cp2020PlayerSkill>,
    skills: Array<Cp2020PlayerSkill>
  ): number {
    doc.setFontSize(PdfFontSize.SM);
    doc.text(
      `Special Ability:   ${specialAbilites.map(
        (sk) => sk.name + ' ' + sk.value
      )}`,
      leftMargin,
      line
    );

    doc.setDrawColor('Dark Gray');
    doc.line(leftMargin, line + 2, leftMargin + 90, line + 2);
    line += 6;
    const skillList = skills
      .map((sk: Cp2020PlayerSkill) => `${sk.name} ${sk.value}`)
      .join('; ');
    const output = doc.splitTextToSize(`Skills:   ${skillList}`, 90);
    output.forEach((row) => {
      doc.text(row, leftMargin, line);
      line += 3.5;
    });
    doc.line(leftMargin, line - 1, leftMargin + 90, line - 1);
    doc.setDrawColor('Black');
    doc.setFontSize(PdfFontSize.DEFAULT);
    return line;
  }

  private createWeapons(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    weapons: CpPlayerWeaponList
  ): number {
    let gear: Array<string> = weapons.items.map((wpn) => wpn.name).sort();
    doc.setFontSize(PdfFontSize.SM);
    const output = doc.splitTextToSize(`Weapons:   ${gear}`, 90);
    output.forEach((row) => {
      doc.text(row, leftMargin, line);
      line += 3.5;
    });
    doc.setDrawColor('Dark Gray');
    doc.line(leftMargin, line - 1, leftMargin + 90, line - 1);

    doc.setDrawColor('Black');
    doc.setFontSize(PdfFontSize.DEFAULT);

    return line;
  }

  private createPossessions(
    doc: jsPDF,
    line: number,
    leftMargin: number,
    gear: Array<string>
  ): number {
    doc.setFontSize(PdfFontSize.SM);
    const output = doc.splitTextToSize(`Posessions:   ${gear}`, 90);
    output.forEach((row) => {
      doc.text(row, leftMargin, line);
      line += 3.5;
    });
    doc.setFontSize(PdfFontSize.DEFAULT);

    return line;
  }
}
