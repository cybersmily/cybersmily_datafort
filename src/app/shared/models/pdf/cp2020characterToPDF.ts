import { Cp2020DeckmanagerPdfSectionService } from './../../cp2020/cp2020-netrun-gear/services/cp2020-deckmanager-pdf-section/cp2020-deckmanager-pdf-section.service';
import { Cp2020ArmorPDFSectionService } from './../../cp2020/cp2020-armor/services/cp2020-armor-pdf-section/cp2020-armor-pdf-section.service';
import { Cp2020Identity } from './../../cp2020/cp2020-lifestyle/models/cp2020-identity';
import { CpHousing } from '../../cp2020/cp2020-lifestyle/models/cp-housing';
import { Cp2020Lifestyle } from './../../cp2020/cp2020-lifestyle/models/cp2020-lifestyle';
import { Cp2020PlayerCyber } from './../../cp2020/cp2020-cyberware/models/cp2020-player-cyber';
import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models/cp2020-armor-block';
import { Cp2020PlayerCyberList } from './../../cp2020/cp2020-cyberware/models';
import {
  Cp2020PlayerSkills,
  Cp2020PlayerSkill,
} from './../../cp2020/cp2020-skills/models';
import { LifePathResults } from './../../cp2020/cp2020-lifepath/models';
import { CpPlayerWeaponList } from './../../cp2020/cp2020weapons/models';
import { Cp2020PlayerGearList } from './../cp2020character/cp2020-player-gear-list';
import { Cp2020PlayerGear } from './../cp2020character/cp2020-player-gear';
import { Cp2020StatBlock } from '../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerCharacter } from '../cp2020character/cp2020-player-character';

import { jsPDF } from 'jspdf';
import { LifepathEvent } from '../../cp2020/cp2020-lifepath/models';
import { Cp2020Vehicle } from '../../cp2020/cp2020-vehicles/models';

export class Cp2020characterToPDF {
  private _character: Cp2020PlayerCharacter;

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = 290;
  private _font = 'Arial';

  constructor(
    private armorPdfService: Cp2020ArmorPDFSectionService,
    private deckmanagerPdfService: Cp2020DeckmanagerPdfSectionService
  ) {}

  generatePdf(character: Cp2020PlayerCharacter) {
    this._character = character;
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);
    this.createFirstPage(doc);
    this.createSecondPage(doc);
    if (this._character.vehicles.length > 0) {
      this.createVehiclesPage(doc);
    }
    this.createThirdPage(doc);
    this.createFourthPage(doc);
    this.createFifthPage(doc);
    const filename = this._character.handle.replace(/[^A-Za-z0-9_]/gi, '');
    doc.save(`CP2020_${filename}.pdf`);
  }

  setupDoc(): jsPDF {
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

  createFirstPage(doc: jsPDF) {
    let line = this._top;
    // add Handle
    line = this.addHandle(doc, this._character.handle, line);

    // character image
    this.addCharImage(doc, this._character.image);

    // Role
    line = this.addRole(doc, this._character.role.name, line);
    const secRole = this._character.secondaryRoles.map((role) => role.name);
    line = this.addSecondaryRole(doc, secRole.join(', '), line);

    // get combat sense
    const combatSense =
      this._character.role.specialAbility.name.toLocaleLowerCase() ===
      'combat sense'
        ? this._character.role.specialAbility.value
        : 0;

    // STATS
    line = this.addStats(
      doc,
      this._character.stats,
      this._character.skills.rep,
      line,
      combatSense
    );

    // Armor
    line = this.addArmorBlock(doc, this._character.armor, line);
    // wounds
    line = this.addWoundRow(
      doc,
      this._character.stats.Save,
      this._character.stats.BTM,
      this._character.stats.BodyDmgMod,
      line
    );
    this.addSkills(
      doc,
      this._character.role.specialAbility,
      this._character.skills,
      this._character.stats,
      this._left,
      line
    );
  }

  createSecondPage(doc: jsPDF) {
    doc.addPage();
    let line = this._top;
    line = this.addWeapons(doc, this._character.weapons, this._left, line);
    line = this.armorPdfService.createCp2020ArmorSection(
      doc,
      this._character.armor,
      this._font,
      this._left,
      line
    );
    doc.addPage();
    line = this._top;
    line = this.addCyberware(doc, this._character.cyberware, this._left, line);
    line = this.addGear(doc, this._character.gear, this._left, line);
    line = this.deckmanagerPdfService.createCp2020CyberdeckProgramsSection(
      doc,
      this._character.cyberdeckPrograms,
      this._font,
      this._left,
      line
    );
  }

  createVehiclesPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('VEHICLES', this._left + 2, this._top + 5);
    this.addVehicles(doc, this._character.vehicles, this._left, this._top + 7);
  }

  createThirdPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('LIFEPATH', this._left + 2, this._top + 5);
    this.addLifePath(doc, this._character.lifepath, this._left, this._top + 10);
  }

  createFourthPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('LIFESTYLE', this._left + 2, this._top + 5);
    this.addLifeStyle(
      doc,
      this._character.lifeStyle,
      this._left,
      this._top + 10
    );
  }
  createFifthPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HISTORY & NOTES', this._left + 2, this._top + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.rect(this._left, this._top, 200, this._pageHeight - this._top, 'S');
    const notes: Array<string> = doc.splitTextToSize(
      this._character.notes,
      190
    );
    let line = this._top + 13;
    notes.forEach((n) => {
      doc.text(n.trim(), this._left + 2, line);
      line += 7;
    });
  }

  private addHandle(doc: jsPDF, handle: string, line: number): number {
    let rw = 22;
    doc.rect(this._left, line, rw, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HANDLE:', this._left + 3, line + 5);
    rw = this._left + rw;
    doc.rect(rw, line, 70, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.text(handle, rw + 1, line + 5);
    return line + 8;
  }

  private addRole(doc: jsPDF, role: string, line: number): number {
    doc.setFillColor('black');
    let rw = 18;
    doc.rect(this._left, line, rw, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('ROLE:', this._left + 3, line + 5);
    rw = this._left + rw;
    doc.rect(rw, line, 75, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFontSize(this._fontSize - 4);
    doc.setFont(this._font, 'normal');

    doc.text(role, rw + 1, line + 5);
    doc.setFontSize(this._fontSize);
    return line + 8;
  }

  private addSecondaryRole(doc: jsPDF, roles: string, line: number): number {
    let rw = 20;
    // determine if all roles will fit
    let txt = new Array<string>();
    txt = doc.splitTextToSize(roles, 74);
    let txtHt = txt.length * this._lineheight;
    txtHt = txtHt < 1 ? this._lineheight : txtHt;
    rw = this._left + rw;
    doc.rect(this._left, line - 1, 93, txtHt, 'S');
    doc.setTextColor('black');
    doc.setFont(this._font, 'bold');
    doc.setFontSize(this._fontSize - 3);
    doc.text('SECONDARY:', this._left + 1, line + 4);
    doc.setFont(this._font, 'normal');
    line = line + 4;
    txt.forEach((t) => {
      doc.text(t, rw + 1, line);
      line += 4;
    });

    doc.setFontSize(this._fontSize);
    return line;
  }

  private addCharImage(doc: jsPDF, img: string) {
    doc.setFillColor('black');
    doc.rect(this._midPage, this._top, 100, 10, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.setFontSize(15);
    doc.text('CYBERPUNK 2020', this._midPage + 25, this._top + 6);
    doc.setFillColor('white');
    doc.setTextColor('black');
    doc.roundedRect(this._midPage, this._top + 10, 100, 80, 0.5, 0.5, 'S');
    // set the width to the ratio of the image hxw
    if (img) {
      const props = doc.getImageProperties(img);
      const ratio = props.width / props.height;
      let width = ratio * 76;
      // set max width
      width = width > 96 ? 96 : width;
      // center the image
      let left = this._midPage + 50;
      left -= width / 2;
      doc.addImage(img, 'JPEG', left, this._top + 12, width, 76);
    }
    doc.setFontSize(this._fontSize);
  }

  private addStats(
    doc: jsPDF,
    stats: Cp2020StatBlock,
    rep: number,
    line: number,
    combatSense: number
  ): number {
    doc.setFillColor('black');
    doc.rect(this._left, line, 20, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('STATS', this._left + 3, line + 5);
    doc.rect(this._left + 20, line, 15, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFillColor('white');
    doc.setFont(this._font, 'normal');
    doc.text(stats.BasePoints.toString(), this._left + 23, line + 5);

    doc.setFillColor('black');
    doc.rect(this._left + 40, line, 15, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('REP', this._left + 43, line + 5);
    doc.rect(this._left + 55, line, 10, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFillColor('white');
    doc.setFont(this._font, 'normal');
    doc.text(rep.toString(), this._left + 60, line + 5);

    doc.setFillColor('black');
    doc.rect(this._left + 70, line, 15, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('INIT', this._left + 73, line + 5);
    doc.rect(this._left + 85, line, 10, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFillColor('white');
    doc.setFont(this._font, 'normal');
    let init: number = stats.REF.Adjusted;
    init += combatSense || 0;
    init += stats.initiativeModifiers.reduce((a, b) => a + b.mod, 0);
    doc.text(init.toString(), this._left + 90, line + 5);

    line = line + 12;
    doc.setTextColor('black');
    doc.text(
      `INT [ ${stats.INT.Adjusted} ]   REF [ ${stats.REF.Adjusted} ]   TECH [ ${stats.TECH.Adjusted}]   COOL [ ${stats.COOL.Adjusted} ]`,
      this._left,
      line
    );
    line = line + 5.5;
    doc.text(
      `ATTR [ ${stats.ATTR.Adjusted} ]   LUCK [ ${stats.LUCK.Adjusted} ]   MA [ ${stats.MA.Adjusted} ]  BODY [ ${stats.BODY.Adjusted} ] EMP [ ${stats.EMP.Adjusted} ]`,
      this._left,
      line
    );
    line = line + 5.5;
    doc.text(
      `Run [ ${stats.Run}m ]   Leap [ ${stats.Leap}m ]  Lift [ ${
        stats.Lift
      }kg ] Hum. [ ${stats.CurrentHumanity.toString()} ]`,
      this._left,
      line
    );
    return line + 2.5;
  }

  private addArmorBlock(
    doc: jsPDF,
    armor: Cp2020ArmorBlock,
    line: number
  ): number {
    doc.setFillColor('black');
    const width = 25;
    const colWidth = 11;
    const rowHeight = 9;
    doc.rect(this._left, line, width, rowHeight, 'DF');
    doc.setTextColor('white');
    doc.text('Location', this._left + 3, line + 5);
    doc.setTextColor('black');
    doc.rect(this._left + width, line, colWidth, 9, 'S');
    doc.rect(this._left + width + colWidth * 1, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 2, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 3, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 4, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 5, line, colWidth, rowHeight, 'S');

    doc.setFontSize(9);
    let textLine = line + 4;
    let textLeft = this._left + width + 1;
    doc.text('Head\n   1', textLeft, textLine);
    doc.text('Torso\n  2-4', textLeft + colWidth * 1, textLine);
    doc.text('R.Arm\n   5', textLeft + colWidth * 2, textLine);
    doc.text('L.Arm\n   6', textLeft + colWidth * 3, textLine);
    doc.text('R.Leg\n  7-8', textLeft + colWidth * 4, textLine);
    doc.text('L.Leg\n  9-0', textLeft + colWidth * 5, textLine);
    doc.setFontSize(this._fontSize);

    line = line + 10;
    doc.setFillColor('black');
    doc.rect(this._left, line, width, rowHeight, 'DF');
    doc.setTextColor('white');
    doc.text('Armor SP', this._left + 3, line + 5);
    doc.setTextColor('black');
    doc.rect(this._left + width, line, colWidth, 9, 'S');
    doc.rect(this._left + width + colWidth * 1, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 2, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 3, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 4, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 5, line, colWidth, rowHeight, 'S');

    doc.setFontSize(9);
    textLine = line + 6;
    textLeft = this._left + width + 3;
    doc.text(armor.headSP.toString(), textLeft, textLine);
    doc.text(armor.torsoSP.toString(), textLeft + colWidth * 1, textLine);
    doc.text(armor.rArmSP.toString(), textLeft + colWidth * 2, textLine);
    doc.text(armor.lArmSP.toString(), textLeft + colWidth * 3, textLine);
    doc.text(armor.rLegSP.toString(), textLeft + colWidth * 4, textLine);
    doc.text(armor.lLegSP.toString(), textLeft + colWidth * 5, textLine);
    doc.setFontSize(this._fontSize);

    return line + 10;
  }

  private addWoundRow(
    doc: jsPDF,
    save: number,
    btm: number,
    bodDmgMod: number,
    line: number
  ): number {
    doc.rect(this._left, line, 13, this._lineheight, 'S');
    doc.text('SAVE', this._left + 1, line + 5);
    doc.rect(this._left, line + this._lineheight, 13, 15, 'S');
    doc.text(save.toString(), this._left + 4, line + this._lineheight + 8);

    const left = this._left + 14;
    doc.rect(left, line, 13, this._lineheight + 15, 'S');
    doc.text('BTM', left + 2, line + 5);
    doc.text(btm.toString(), left + 4, line + 10);
    doc.text('BDM', left + 2, line + 15);
    const prefix = bodDmgMod > 0 ? '+' : '';
    doc.text(`${prefix}${bodDmgMod}`, left + 4, line + 20);
    doc.setFont(this._font, 'normal');
    const woundWidth = 12;
    this.addWounds(doc, 'LIGHT', 0, line + 2, left + 14, woundWidth);
    this.addWounds(doc, 'SERIOUS', -1, line + 2, left + 26, woundWidth);
    this.addWounds(doc, 'CRITICAL', -2, line + 2, left + 38, woundWidth);
    this.addWounds(doc, 'MORTAL0', -3, line + 2, left + 50, woundWidth);
    this.addWounds(doc, 'MORTAL1', -4, line + 2, left + 62, woundWidth);

    this.addWounds(doc, 'MORTAL2', -5, line + 12, left + 14, woundWidth);
    this.addWounds(doc, 'MORTAL3', -6, line + 12, left + 26, woundWidth);
    this.addWounds(doc, 'MORTAL4', -7, line + 12, left + 38, woundWidth);
    this.addWounds(doc, 'MORTAL5', -8, line + 12, left + 50, woundWidth);
    this.addWounds(doc, 'MORTAL6', -9, line + 12, left + 62, woundWidth);
    line += this._lineheight + 17;
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
    doc.setFontSize(7);
    doc.text(level, left, line);
    line = line + 1;
    doc.rect(left, line, 2, 2, 'S');
    doc.rect(left + 2, line, 2, 2, 'S');
    doc.rect(left + 4, line, 2, 2, 'S');
    doc.rect(left + 6, line, 2, 2, 'S');
    line = line + 2.4;
    doc.rect(left, line, width, 4, 'DF');
    doc.setTextColor('white');
    doc.text(`Stun=${stun}`, left + 1, line + 2.5);
    doc.setTextColor('black');
    doc.setFontSize(this._fontSize);
  }

  private addSkills(
    doc: jsPDF,
    sa: Cp2020PlayerSkill,
    skills: Cp2020PlayerSkills,
    stats: Cp2020StatBlock,
    left: number,
    line: number
  ) {
    line = this.printSkillSectionTitle(doc, line, left, skills.ip.toString());
    const colWidth = 50;
    let col = left;
    line += 4;

    // SPECIAL ABILITIES SKILLS
    line = this.printSkills(
      doc,
      skills.specialAbilites,
      'SPECIAL ABILITY',
      undefined,
      line,
      col
    );

    // ATTR SKILLS
    line = this.printSkills(
      doc,
      skills.ATTR,
      'ATTR',
      stats.ATTR.Adjusted,
      line,
      col
    );
    // BODY SKILLS
    line = this.printSkills(
      doc,
      skills.BODY,
      'BODY',
      stats.BODY.Adjusted,
      line,
      col
    );
    // COOL SKILLS
    line = this.printSkills(
      doc,
      skills.COOL,
      'COOL/WILL',
      stats.COOL.Adjusted,
      line,
      col
    );
    // EMPATHY SKILLS
    line = this.printSkills(
      doc,
      skills.EMP,
      'EMPATHY',
      stats.EMP.Adjusted,
      line,
      col
    );
    // INT SKILLS
    line = this.printSkills(
      doc,
      skills.INT.slice(0, 92),
      'INT',
      stats.INT.Adjusted,
      line,
      col
    );
    if (skills.skills.length > 180 || skills.INT.length > 92) {
      doc.addPage();
      line = this._top + 10;
      line = this.printSkillSectionTitle(doc, line, left, skills.ip.toString());
      line += 4;
      line = this.printSkills(
        doc,
        skills.INT.slice(92),
        'INT (continued)',
        stats.INT.Adjusted,
        line,
        col
      );
    }
    // REF SKILLS
    line = this.printSkills(
      doc,
      skills.REF,
      'REF',
      stats.REF.Adjusted,
      line,
      col
    );

    // TECH SKILLS
    line = this.printSkills(
      doc,
      skills.TECH,
      'TECH',
      stats.TECH.Adjusted,
      line,
      col
    );

    line = this.printSkills(doc, skills.Other, 'OTHER', 0, line, col);
    line += 6;
  }

  private printSkillSectionTitle(
    doc: jsPDF,
    line: number,
    left: number,
    ip: string
  ): number {
    doc.setFillColor('black');
    doc.rect(this._left, line, 22, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('SKILLS', left + 3, line + 5);
    doc.setTextColor('black');
    doc.rect(this._left + 20, line, 15, this._lineheight, 'S');
    doc.text('IP:', left + 23, line + 5);
    doc.text(ip, left + 28, line + 5);
    doc.setFont(this._font, 'normal');
    doc.setFontSize(6);
    doc.text(
      'Skills show level| level + stat in box []. X next to box is chipped',
      left + 38,
      line + 3
    );
    line += 7;
    return line;
  }

  private printSkills(
    doc: jsPDF,
    skills: Array<Cp2020PlayerSkill>,
    statName: string,
    stat: number,
    line: number,
    col: number
  ): number {
    doc.setFont(this._font, 'bold');
    doc.setFontSize(8);
    doc.text(`${statName} (${stat ?? 'NA'})`, col + 1, line);
    doc.setFont(this._font, 'normal');
    let currline = line + 4;
    doc.setFontSize(8);
    let index = Math.ceil(skills.length / 4);
    const colWidth = 53;
    const colOne = skills.slice(0, index);
    const colTwo = skills.slice(index, index * 2);
    const colThree = skills.slice(index * 2, index * 3);
    const colFour = skills.slice(index * 3);
    this.printSkillColumn(doc, colOne, stat, currline, col);
    this.printSkillColumn(doc, colTwo, stat, currline, colWidth);
    this.printSkillColumn(doc, colThree, stat, currline, colWidth * 2);
    this.printSkillColumn(doc, colFour, stat, currline, colWidth * 3);
    //this.printSkillColumn(doc, colFive, stat, currline, colWidth * 4);
    doc.rect(this._left, line - 3, 200, colOne.length * 4 + 4, 'S');
    return currline + colOne.length * 4;
  }

  private printSkillColumn(
    doc: jsPDF,
    skills: Array<Cp2020PlayerSkill>,
    stat: number,
    line: number,
    col: number
  ) {
    skills.forEach((s) => {
      const name = `${s.name}${s.option ? ` - ${s.option}` : ''}${
        s.isSA && s.stat !== '' ? '(' + s.stat + ')' : ''
      }`;
      doc.text(
        `[${s.value}|${s.value + (stat ?? 0)}] ${s.chipped ? 'X' : ''}`,
        col + 2,
        line
      );
      doc.text(name, col + 9, line);
      line += 4;
    });
  }

  private addCyberware(
    doc: jsPDF,
    cyber: Cp2020PlayerCyberList,
    left: number,
    line: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('CYBERNETICS', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    line += 7;
    doc.setFontSize(8);
    const ht = 6;
    const index = Math.ceil(cyber.items.length / 2);
    const colOne = cyber.items.slice(0, index);
    const colTwo = cyber.items.slice(index, index * 2);
    this.printCyberColumn(doc, colOne, left, line);
    this.printCyberColumn(doc, colTwo, this._midPage, line);
    line += colOne.length * ht + ht;
    // footer
    doc.rect(left, line, this._midPage + 75, ht, 'S');
    doc.rect(this._midPage + 80, line, 10, ht, 'S');
    doc.rect(this._midPage + 90, line, 10, ht, 'S');
    doc.text('Total HL and Cost', left + 2, line + 4);
    doc.text(
      cyber.totalHL ? cyber.totalHL.toString() : '',
      this._midPage + 81,
      line + 4
    );
    doc.text(
      cyber.totalCost ? cyber.totalCost.toLocaleString('en') : '',
      this._midPage + 91,
      line + 4
    );

    return line + 7;
  }

  private printCyberColumn(
    doc: jsPDF,
    cyber: Array<Cp2020PlayerCyber>,
    left: number,
    line: number
  ): number {
    const ht = 6;
    // header
    doc.rect(left, line, 80, ht, 'S');
    doc.rect(left + 80, line, 10, ht, 'S');
    doc.rect(left + 90, line, 10, ht, 'S');
    doc.text('Type', left + 2, line + 4);
    doc.text('HL', left + 81, line + 4);
    doc.text('Cost', left + 91, line + 4);
    line += ht;
    cyber.forEach((c) => {
      let cyberName = new Array<string>();
      cyberName = doc.splitTextToSize(c.toString(), 79);
      let rectHt = 0;
      const rectLine = line;
      cyberName.forEach((txt) => {
        doc.text(txt, left + 2, line + 4);
        line += ht;
        rectHt += ht;
      });
      doc.rect(left, rectLine, 80, rectHt, 'S');
      doc.rect(left + 80, rectLine, 10, rectHt, 'S');
      doc.rect(left + 90, rectLine, 10, rectHt, 'S');
      doc.text(c.totalHL ? c.totalHL.toString() : '', left + 81, rectLine + 4);
      doc.text(
        c.totalCost ? c.totalCost.toLocaleString('en') : '',
        left + 91,
        rectLine + 4
      );
    });
    return cyber.length * ht + ht;
  }

  private addGear(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    left: number,
    line: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('GEAR', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    line += 7;
    doc.setFontSize(9);
    const ht = 6;
    const index = Math.ceil(gear.items.length / 2);
    const colOne = gear.items.slice(0, index);
    const colTwo = gear.items.slice(index, index * 2);
    this.printGearColumn(doc, colOne, left, line);
    this.printGearColumn(doc, colTwo, this._midPage, line);
    doc.setFontSize(this._fontSize);
    line += ht * colOne.length;
    return line;
  }

  private printGearColumn(
    doc: jsPDF,
    gear: Array<Cp2020PlayerGear>,
    left: number,
    line: number
  ) {
    const ht = 6;
    // header
    doc.rect(left, line, 80, ht, 'S');
    doc.rect(left + 80, line, 10, ht, 'S');
    doc.rect(left + 90, line, 10, ht, 'S');
    doc.text('type', left + 2, line + 4);
    doc.text('Cost', left + 81, line + 4);
    doc.text('Wt', left + 91, line + 4);
    line += ht;
    gear.forEach((g) => {
      doc.rect(left, line, 80, ht, 'S');
      doc.rect(left + 80, line, 10, ht, 'S');
      doc.rect(left + 90, line, 10, ht, 'S');
      doc.text(g.gear, left + 1, line + 4);
      const cost: string = g.cost ? g.cost.toString() : '';
      const wt: string = g.weight ? g.weight.toString() : '';
      doc.text(cost, left + 81, line + 4);
      doc.text(wt, left + 91, line + 4);
      line += ht;
    });
    doc.setFontSize(this._fontSize);
  }

  private addVehicles(
    doc: jsPDF,
    vehicles: Array<Cp2020Vehicle>,
    left: number,
    line: number
  ) {
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');

    let newLine = line;
    vehicles.forEach((veh, i) => {
      line = i % 2 === 1 ? newLine : line;
      left = i % 2 === 1 ? this._left : left + 100;
      line = this.addVehicleDetail(doc, veh, left, line);
      line += 10;
    });
  }

  private addVehicleDetail(
    doc: jsPDF,
    vehicle: Cp2020Vehicle,
    left: number,
    line: number
  ): number {
    const height = line;
    line += 4;
    const ht = 5;
    const colOneLeft = left + 3;
    const colTwoLeft = left + 50;
    doc.setFont(this._font, 'bold');
    doc.setFontSize(this._fontSize);
    doc.text(vehicle.name, left + 1, line);
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize - 3);
    line += ht;
    doc.text(`Type: ${vehicle.type}`, colOneLeft, line);
    doc.text(`SDP/SP: ${vehicle.sdp}/${vehicle.sp}`, colTwoLeft, line);
    line += ht;
    doc.text(`Speed: ${vehicle.speed}mph`, colOneLeft, line);
    doc.text(
      `Acc/Dec: ${vehicle.accelerate}mph/${vehicle.decelerate}mph`,
      colTwoLeft,
      line
    );
    line += ht;
    doc.text(`Range: ${vehicle.range}miles`, colOneLeft, line);
    doc.text(`Manuever: ${vehicle.manuever}`, colTwoLeft, line);
    line += ht;
    doc.text(
      `Crew/Passengers: ${vehicle.crew}/${vehicle.passengers}`,
      colOneLeft,
      line
    );
    doc.text(`Cargo: ${vehicle.cargo}`, colTwoLeft, line);
    line += ht;
    doc.text(`OffRoad: ${vehicle.offRoad}`, colOneLeft, line);
    doc.text(`Cost: ${vehicle.cost}eb`, colTwoLeft, line);
    line += ht;
    const wpnstring = vehicle.weapons.map((wpn) => wpn.name).join(', ');
    const wpnText = doc.splitTextToSize(`Weapons: ${wpnstring}`, 100);
    wpnText.forEach((txt) => {
      doc.text(txt, colOneLeft, line);
      line += ht;
    });
    const optstring = vehicle.options.map((opt) => opt.name).join(', ');
    const optText = doc.splitTextToSize(`Options: ${optstring}`, 100);
    optText.forEach((txt) => {
      doc.text(txt, colOneLeft, line);
      line += ht;
    });
    const desc = doc.splitTextToSize(
      `Description: ${vehicle.description}`,
      100
    );
    doc.text(desc, colOneLeft, line);
    line += ht;

    doc.rect(left, height, 100, line - height, 'S');

    return line;
  }

  private addWeapons(
    doc: jsPDF,
    weapons: CpPlayerWeaponList,
    left: number,
    line: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('WEAPONS', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(7);
    const ht = 5;
    const leftMargin = left;
    line += 7;
    // header
    doc.rect(left, line, 30, ht, 'S');
    doc.text('Name', left + 1, line + 4);
    left += 30;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('type', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('WA', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('Conc.', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('Avail.', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 12, ht, 'S');
    doc.text('Dam.', left + 0.5, line + 4);
    left += 12;

    doc.rect(left, line, 10, ht, 'S');
    doc.text('#Shots', left + 0.5, line + 4);
    left += 10;

    doc.rect(left, line, 9, ht, 'S');
    doc.text('ROF', left + 0.5, line + 4);
    left += 9;

    doc.rect(left, line, 7, ht, 'S');
    doc.text('Rel', left + 0.5, line + 4);
    left += 7;

    doc.rect(this._midPage, line, 100, ht, 'S');
    doc.text('Notes', this._midPage + 3, line + 4);
    left += 7;

    line += ht;
    weapons.items.forEach((w) => {
      const startLine = line;
      left = leftMargin;
      const textLine = line + 3.5;
      doc.rect(left, line, 30, ht, 'S');
      doc.text(w.name ? w.name : '', left + 1, textLine);
      left += 30;

      doc.rect(left, line, 8, ht, 'S');
      doc.text(w.type ? w.type : '', left + 0.5, textLine);
      left += 8;

      doc.rect(left, line, 8, ht, 'S');
      doc.text(w.wa ? w.wa.toString() : '', left + 0.5, textLine);
      left += 8;

      doc.rect(left, line, 8, ht, 'S');
      doc.text(w.conc ? w.conc : '', left + 0.5, textLine);
      left += 8;

      doc.rect(left, line, 8, ht, 'S');
      doc.text(w.avail ? w.avail : '', left + 0.5, textLine);
      left += 8;

      doc.rect(left, line, 12, ht, 'S');
      doc.text(w.damage ? w.damage : '', left + 0.5, textLine);
      left += 12;

      doc.rect(left, line, 10, ht, 'S');
      doc.text(w.shots ? w.shots.toString() : '', left + 0.5, textLine);
      left += 10;

      doc.rect(left, line, 9, ht, 'S');
      doc.text(w.rof ? w.rof.toString() : '', left + 0.5, textLine);
      left += 9;

      doc.rect(left, line, 7, ht, 'S');
      doc.text(w.rel ? w.rel : '', left + 0.5, textLine);
      left += 7;
      line += ht;

      let shotsHt = 0;
      if (w.shots && w.shots > 1) {
        left = leftMargin + 5;
        for (let i = 0; i < w.shots; i++) {
          doc.rect(left, line + shotsHt + 1, 2, 2, 'S');
          left += 3;
          if ((i + 1) % 30 === 0) {
            left = leftMargin + 5;
            shotsHt += ht;
          }
        }
        shotsHt += ht;
        doc.rect(leftMargin, line, 100, shotsHt, 'S');
      }
      let noteHeight = 0;
      if (w.options && w.options.length > 0) {
        let noteLine = line + shotsHt + ht - 2;
        let left = leftMargin + 5;
        const opts = w.options.map((o) => `${o.count} ${o.name}`).join(', ');
        const optText = doc.splitTextToSize(`Options: ${opts}`, 90);
        optText.forEach((txt) => {
          noteHeight += ht;
          doc.text(txt, left, noteLine);
          noteLine += ht - 2;
        });
        doc.rect(leftMargin, line + shotsHt, 100, noteHeight, 'S');
      }

      let rectHt = ht;
      if ((w.notes && w.notes !== '') || w.thrown) {
        const text = (w.thrown ? 'Thrown. ' : '') + (w.notes ? w.notes : '');
        let notes = new Array<string>();
        notes = doc.splitTextToSize(text, 90);
        rectHt = ht;
        let noteLine = startLine;
        notes.forEach((txt) => {
          doc.text(txt, this._midPage + 2, noteLine + 3.5);
          noteLine += ht;
          rectHt += ht;
        });
      }
      const adjHt =
        rectHt > shotsHt + noteHeight ? rectHt - ht : shotsHt + noteHeight;
      doc.rect(this._midPage, startLine, 100, adjHt + ht, 'S');
      line += adjHt;
    });
    doc.setFontSize(this._fontSize);
    return line + 6;
  }

  private printLifepathLine(
    doc: jsPDF,
    title: string,
    value: string,
    margin: number,
    left: number,
    line: number
  ): number {
    doc.text(title, left + 5, line + 5);
    doc.setFont(this._font, 'normal');
    doc.text(value, left + margin, line + 5);
    line += 6.5;
    return line;
  }

  private addLifePath(
    doc: jsPDF,
    lifepath: LifePathResults,
    left: number,
    line: number
  ) {
    const ht = 6.5;
    const recth = 6;
    let startLine = line;
    let secondLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');

    // Style
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Style', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht;
    let margin = 28;
    line = this.printLifepathLine(
      doc,
      'Clothes',
      lifepath.appearance.clothes,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Hair',
      lifepath.appearance.hairstyle,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Affections',
      lifepath.appearance.affectations,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Ethnicity',
      lifepath.ethnicity.name,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Language',
      lifepath.ethnicity.language,
      margin,
      left,
      line
    );
    doc.rect(left, startLine, 200, 39, 'S');

    // Motivations
    doc.setFillColor('black');
    doc.rect(this._midPage, secondLine, 25, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Motivations', this._midPage + 2, secondLine + 4);
    doc.setTextColor('black');
    secondLine += ht;
    margin = 40;
    secondLine = this.printLifepathLine(
      doc,
      'Traits:',
      lifepath.motivations.personality,
      margin,
      this._midPage,
      secondLine
    );
    secondLine = this.printLifepathLine(
      doc,
      'Valued Person:',
      lifepath.motivations.valuedperson,
      margin,
      this._midPage,
      secondLine
    );
    secondLine = this.printLifepathLine(
      doc,
      'Value Most:',
      lifepath.motivations.valuemost,
      margin,
      this._midPage,
      secondLine
    );
    const feel =
      lifepath.motivations.feelaboutpeople.length > 30
        ? lifepath.motivations.feelaboutpeople.substring(0, 30) + '...'
        : lifepath.motivations.feelaboutpeople;
    secondLine = this.printLifepathLine(
      doc,
      'Feel About People:',
      feel,
      margin,
      this._midPage,
      secondLine
    );
    secondLine = this.printLifepathLine(
      doc,
      'Valued Possesion:',
      lifepath.motivations.valuedpossession,
      margin,
      this._midPage,
      secondLine
    );

    // Family
    startLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');
    doc.rect(left, line, 40, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Family Background', left + 2, line + 4);
    doc.setTextColor('black');

    line += ht;
    doc.setFont(this._font, 'normal');
    if (lifepath.family.familyRanking && lifepath.family.familyRanking !== '') {
      doc.text('Ranking: ' + lifepath.family.familyRanking, left + 5, line + 4);
    }
    line += ht;
    let fam = new Array<string>();
    if (
      lifepath.family.familyBackground &&
      lifepath.family.familyBackground !== ''
    ) {
      fam = doc.splitTextToSize(lifepath.family.familyBackground, 190);
    }
    let famHt = ht * 2;
    for (let i = 0; i < 4; i++) {
      if (fam[i]) {
        doc.text(fam[i].trim(), left + 5, line + 4);
      }
      line += ht;
      famHt += ht;
    }
    doc.rect(left, startLine, 200, famHt, 'S');

    startLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');
    doc.rect(left, line, 25, recth, 'FD');
    doc.setTextColor('white');
    doc.text('# Siblings', left + 2, line + 4);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    const bro = lifepath.family.siblings.getBrothersCount().toString();
    const sis = lifepath.family.siblings.getSistersCount().toString();
    doc.text(`${bro} brothers   ${sis} sisters`, left + 27, line + 4);
    line += ht + 3;
    const sibIndex = Math.ceil(lifepath.family.siblings.siblings.length / 2);
    const sibOne = lifepath.family.siblings.siblings.slice(0, sibIndex);
    const sibTwo = lifepath.family.siblings.siblings.slice(sibIndex);
    secondLine = line;
    let sibHt = ht + 3;
    sibOne.forEach((sib) => {
      doc.text(
        `${sib.name ? sib.name : ''} ${sib.age} ${sib.feeling}`,
        left + 5,
        line
      );
      line += ht;
      sibHt += ht;
    });
    sibTwo.forEach((sib) => {
      doc.text(
        `${sib.name ? sib.name : ''} ${sib.age} ${sib.feeling}`,
        this._midPage + 5,
        secondLine
      );
      secondLine += ht;
    });
    doc.rect(left, startLine, 200, sibHt, 'S');

    // Life Events
    doc.rect(left, line, 200, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Life Events', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht;

    doc.setFontSize(8);
    doc.setFont(this._font, 'normal');
    doc.setTextColor('black');
    doc.rect(left, line, 10, recth, 'S');
    doc.text('YEAR', left + 1, line + 5);
    doc.rect(left + 10, line, 190, recth, 'S');
    doc.text('EVENT', left + 12, line + 5);
    line += ht;
    line = this.printLifeEvents(doc, lifepath.events, left, line, ht);
    doc.setFont(this._font, 'normal');
  }

  private printLifeEvents(
    doc: jsPDF,
    events: Array<LifepathEvent>,
    left: number,
    line: number,
    ht: number
  ): number {
    const recth = 6;
    events.forEach((e) => {
      if (e.event && e.event.trim() !== '') {
        const details: Array<string> = doc.splitTextToSize(e.event, 185);

        if (line + details.length * 5 > this._pageHeight) {
          doc.addPage();
          line = this._top;
        }
        const h = recth * details.length + 1;
        doc.rect(left, line, 10, h, 'S');
        doc.text(e.age ? e.age.toString() : '', left + 1, line + 5);
        doc.rect(left + 10, line, 190, h, 'S');
        let lineHt = line - 1;
        details.forEach((d) => {
          doc.text(d.trim(), left + 11, lineHt + 5);
          lineHt += 5;
        });
        line += h;
      } else {
        doc.rect(left, line, 10, recth, 'S');
        doc.text(e.age ? e.age.toString() : '', left + 1, line + 5);
        doc.rect(left + 10, line, 190, recth, 'S');
        doc.text('', left + 11, line + 5);
        line += ht;
      }
      if (line > this._pageHeight) {
        doc.addPage();
        line = this._top;
      }
    });
    return line;
  }

  private addLifeStyle(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number
  ) {
    const ht = 6.5;
    const recth = 6;
    let startLine = line;
    let secondLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');

    // Money
    line = this.addMoney(doc, lifestyle, left, line, ht, recth);
    line = this.addHousing(doc, lifestyle, left, line, ht, recth);
    line = this.addServices(doc, lifestyle, left, line, ht, recth);
    line = this.addGroceries(doc, lifestyle, left, line, ht, recth);
    line = this.addIdenties(doc, lifestyle, left, line, ht, recth);
  }

  private addMoney(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    doc.rect(left, line, 20, recth, 'FD');
    doc.rect(left, line, 200, recth + ht * 2, 'S');
    doc.setTextColor('white');
    doc.text('Money', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht * 2;

    const totalCred = lifestyle.credchips.reduce((a, b) => a + b.amount, 0);
    const totalMoney = lifestyle.cash + totalCred;
    doc.text(`Total: ${totalMoney}eb`, left + 4, line);
    doc.text(
      `Credchips(${lifestyle.credchips.length}): ${totalCred}eb`,
      left + 40,
      line
    );
    doc.text(`Cash: ${lifestyle.cash}eb`, this._midPage, line);
    doc.text(`Salary: ${lifestyle.salary}eb`, this._midPage + 40, line);
    doc.text(`debt: ${lifestyle.debt}eb`, this._midPage + 70, line);
    line += ht;
    return line;
  }

  private addHousing(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');

    doc.setTextColor('white');
    doc.text('Housing', left + 2, line + 4);
    doc.setTextColor('black');
    let totalMonthlyCost = lifestyle.housing.reduce(
      (a, b) => a + b.cost * b.qualityMod * b.rooms,
      0
    );
    lifestyle.housing.forEach((housing) => {
      totalMonthlyCost += housing.utilities.reduce(
        (a, b) => a + b.cost * b.count,
        0
      );
    });
    doc.text(
      `Monthly Cost: ${totalMonthlyCost}eb`,
      this._midPage + 65,
      line + 4
    );
    line += ht * 2;

    // add each housing
    let housingRect = recth;
    lifestyle.housing.forEach((housing) => {
      const result = this.printHousing(doc, housing, left + 2, line);
      line = result.line;
      housingRect += result.recth;
    });
    doc.rect(left, startLine, 200, housingRect - ht, 'S');

    return line;
  }

  private printHousing(
    doc: jsPDF,
    housing: CpHousing,
    left: number,
    line: number
  ): { line: number; recth: number } {
    const ht = 6;
    let recth = ht;
    const type = housing.cost === 200 ? 'Apt./Condo' : 'House';
    let cost = housing.utilities.reduce((a, b) => a + b.cost * b.count, 0);
    cost += housing.rooms * housing.cost * housing.qualityMod;
    let zone = '';
    switch (housing.qualityMod) {
      case 2:
        zone = 'Moderate';
        break;
      case 4:
        zone = 'Corporate';
        break;
      case 6:
        zone = 'Executive';
        break;
      default:
        zone = 'Combat';
    }
    doc.text(
      `${housing.name} - ${housing.rooms} room ${type} in ${zone} Zone - ${cost}eb/month`,
      left,
      line
    );
    line += ht;
    recth += ht;
    doc.text(`Loation: ${housing.location}`, left + 3, line);
    line += ht;
    recth += ht;
    doc.text(`Description: `, left + 3, line);
    const desc: Array<string> = doc.splitTextToSize(housing.desc, 175);
    desc.forEach((d) => {
      doc.text(d.trim(), left + 20, line);
      line += ht;
      recth += ht;
    });
    if (desc.length < 0) {
      line += ht;
      recth += ht;
    }
    doc.text(
      `Utilities: ${housing.utilities
        .map((u) => {
          if (u.count > 0) {
            return u.name;
          }
        })
        .join(' ')}`,
      left + 3,
      line
    );
    line += ht;
    recth += ht;

    doc.text(`Contents:`, left + 3, line);
    const contents = housing.contents.join(', ');
    const con: Array<string> = doc.splitTextToSize(contents, 175);
    con.forEach((d) => {
      doc.text(d.trim(), left + 20, line);
      line += ht;
      recth += ht;
    });
    if (con.length < 0) {
      line += ht;
      recth += ht;
    }
    return { line: line, recth: recth };
  }

  private addServices(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Services', left + 2, line + 4);
    doc.setTextColor('black');
    let totalMonthlyCost = lifestyle.services.reduce((a, b) => a + b.cost, 0);
    lifestyle.services.forEach((srv) => {
      if (srv.options) {
        totalMonthlyCost += srv.options.reduce(
          (a, b) => a + b.cost * b.count,
          0
        );
      }
    });
    doc.text(
      `Monthly Cost: ${totalMonthlyCost}eb`,
      this._midPage + 65,
      line + 4
    );
    line += ht * 2;
    const services = lifestyle.services.map((s) => {
      let txt = s.name;
      let cost = s.cost;
      if (s.options) {
        let opt = '';
        opt +
          s.options.map((o) => (o.count > 0 ? o.name : undefined)).join(', ');
        if (opt !== '') {
          txt += ` [${opt}]`;
        }
        cost += s.options.reduce((a, b) => a + b.cost * b.count, 0);
      }
      txt += ` (${cost}eb)`;
      return txt;
    });
    const srv: Array<string> = doc.splitTextToSize(services.join(', '), 175);
    srv.forEach((d) => {
      doc.text(d.trim(), left + 3, line);
      line += ht;
      recth += ht;
    });
    if (srv.length < 0) {
      line += ht;
      recth += ht;
    }
    doc.rect(left, startLine, 200, recth + ht, 'S');
    return line;
  }

  private addGroceries(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Groceries', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht * 2;
    const groceries = lifestyle.food.map(
      (food) =>
        `${food.count} ${food.unit}${food.count > 1 ? 's' : ''} of ${
          food.quality
        } ${food.name}`
    );
    const food: Array<string> = doc.splitTextToSize(groceries.join(', '), 175);
    food.forEach((d) => {
      doc.text(d.trim(), left + 3, line);
      line += ht;
      recth += ht;
    });
    if (food.length < 0) {
      line += ht;
      recth += ht;
    }
    doc.rect(left, startLine, 200, recth + ht, 'S');
    return line;
  }

  private addIdenties(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Identities', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht;

    const index = Math.ceil(lifestyle.identities.length / 2);
    const colOne = lifestyle.identities.slice(0, index);
    const colTwo = lifestyle.identities.slice(index);
    this.printIdentities(doc, colTwo, this._midPage, line, ht);
    line = this.printIdentities(doc, colOne, left, line, ht);

    doc.rect(left, startLine, 200, line - startLine + ht, 'S');

    return line;
  }

  private printIdentities(
    doc: jsPDF,
    identities: Array<Cp2020Identity>,
    left: number,
    line: number,
    ht: number
  ): number {
    identities.forEach((id) => {
      doc.text(
        `${id.name} ${id.sin !== '' ? 'S.I.N.: ' + id.sin : ''}`,
        left + 2,
        line + 4
      );
      line += ht;
      const desc: Array<string> = doc.splitTextToSize(
        `Description: ${id.desc}`,
        95
      );
      desc.forEach((d) => {
        doc.text(d.trim(), left + 2, line);
        line += ht;
      });
      if (desc.length < 0) {
        line += ht;
      }
    });
    return line;
  }
}
