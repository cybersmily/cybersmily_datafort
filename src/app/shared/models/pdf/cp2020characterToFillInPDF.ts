import { Cp2020PlayerSkills, Cp2020PlayerSkill } from './../cp2020character';
import { LifePathResults } from './../lifepath/lifepath-results';
import { Cp2020PlayerCyberList } from './../cyberware/cp2020-player-cyber-list';
import { CpPlayerWeaponList } from './../weapon/cp-player-weapon-list';
import { Cp2020PlayerGearList } from './../cp2020character/cp2020-player-gear-list';
import { Cp2020ArmorBlock } from './../cp2020character/cp2020-armor-block';
import { Cp2020StatBlock } from './../cp2020character/cp2020-stat-block';
import { Cp2020PlayerCharacter } from '../cp2020character/cp2020-player-character';

import {AcroFormCheckBox, AcroFormTextField, jsPDF} from 'jspdf';

export class Cp2020characterToPDF {
  private _character: Cp2020PlayerCharacter;

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = 290;
  private _font = 'Arial';

  generatePdf( character: Cp2020PlayerCharacter) {
    this._character = character;
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);
    this.createFirstPage(doc);
    this.createSecondPage(doc);
    this.createThirdPage(doc);
    const filename = this._character.handle.replace(/[^A-Za-z0-9_]/gi, '');
    doc.save(`CP2020_${filename}.pdf`);
  }

  setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
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
    this.addHandle(doc, this._character.handle, line);

    // character image
    this.addCharImage(doc);

    // Role
    this.addRole(doc, this._character.role.name, line + 8);

    // STATS
    line = this.addStats(doc, this._character.stats, line + 16);

    // Armor
    line = this.addArmorBlock(doc, this._character.armor, line);
    // wounds
    line = this.addWoundRow(doc, this._character.stats.Save, this._character.stats.BTM, line);

    this.addSkills(doc, this._character.role.specialAbility, this._character.skills, this._character.stats, this._left, line);
    this.addCyberware(doc, this._character.cyberware, this._midPage, 165);
  }

  createSecondPage( doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('LIFEPATH, GEAR, & WEAPONS', this._left + 2, this._top + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');

    this.addLifePath(doc, this._character.lifepath, this._left, this._top + 10);
    this.addGear(doc, this._character.gear, this._midPage, this._top + 10);
    this.addWeapons(doc, this._character.weapons, this._midPage, 180);
  }

  createThirdPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HISTORY & NOTES', this._left + 2, this._top + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    this.createMultiLinField(doc, this._character.notes, this._left, this._top + 8, 200, this._pageHeight - 15);
  }

  private addHandle(doc: jsPDF, handle: string, line: number) {
    let rw = 22;
    doc.rect(this._left, line, rw, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HANDLE:', this._left + 3, line + 5);
    rw = this._left + rw;
    this.createTextField(doc, handle, rw, line, 70, this._lineheight);
  }

private addRole(doc: jsPDF, role: string, line: number) {
  doc.setFillColor('black');
  let rw = 22;
  doc.rect(this._left, line, rw, this._lineheight, 'DF');
  doc.setTextColor('white');
  doc.setFont(this._font, 'bold');
  doc.text('ROLE:', this._left + 3, line + 5);
  rw = this._left + rw;
  this.createTextField(doc, role, rw, line, 70, this._lineheight);
}

private addCharImage(doc: jsPDF) {
  doc.setFillColor('black');
  doc.setTextColor('white');
  doc.rect(this._midPage, this._top, 100, 10, 'DF');
  doc.setFont(this._font, 'bold');
  doc.setFontSize(15);
  doc.text('CYBERPUNK 2020', this._midPage + 20, this._top + 6);
  doc.setFillColor('white');
  doc.setTextColor('black');
  doc.roundedRect(this._midPage, this._top + 10, 100, 80, 0.5, 0.5, 'S');
  doc.setFontSize(this._fontSize);
}


private addStats(doc: jsPDF, stats: Cp2020StatBlock, line: number): number {
  doc.setFillColor('black');
  doc.rect(this._left, line, 20, this._lineheight, 'DF');
  doc.setTextColor('white');
  doc.setFont(this._font, 'bold');
  doc.text('STATS', this._left + 3, line + 5);
  this.createTextField(doc, stats.BasePoints.toString(), this._left + 20, line, 15, this._lineheight);

  line = line + 12;
  doc.setTextColor('black');
  this.createStatField( doc, 'INT', stats.INT.Adjusted.toString(), this._left, line);
  this.createStatField( doc, 'REF', stats.REF.Adjusted.toString(), this._left + 18, line);
  this.createStatField( doc, 'TECH', stats.TECH.Adjusted.toString(), this._left + 38, line);
  this.createStatField( doc, 'COOL', stats.COOL.Adjusted.toString(), this._left + 62, line);

  line = line + 5.5;
  this.createStatField( doc, 'ATTR', stats.ATTR.Adjusted.toString(), this._left, line);
  this.createStatField( doc, 'LUCK', stats.LUCK.Adjusted.toString(), this._left + 23, line);
  this.createStatField( doc, 'MA', stats.MA.Adjusted.toString(), this._left + 45, line);
  this.createStatField( doc, 'BODY', stats.BODY.Adjusted.toString(), this._left + 62, line);
  line = line + 5.5;
  this.createStatField( doc, 'EMP', stats.EMP.Adjusted.toString(), this._left, line);
  doc.text('Run', this._left + 20, line);
  this.createTextField(doc, stats.Run.toString(), this._left + 28, line - 4, 8, this._lineheight - 2.5, null, 'right');
  doc.text('m', this._left + 36, line);
  doc.text('Leap', this._left + 41, line);
  this.createTextField(doc, stats.Leap.toString(), this._left + 51, line - 4, 10, this._lineheight - 2.5, null, 'right');
  doc.text('m', this._left + 61, line);
  doc.text('Lift', this._left + 67, line);
  this.createTextField(doc, stats.Lift.toString(), this._left + 74, line - 4, 10, this._lineheight - 2.5, null, 'right');
  doc.text('kg', this._left + 85, line);
  return line + 2.5;
}

private addArmorBlock(doc: jsPDF, armor: Cp2020ArmorBlock, line: number): number {
  doc.setFillColor('black');
  const width = 25;
  const colWidth = 11;
  const rowHeight = 9;
  doc.rect(this._left, line, width, rowHeight, 'DF');
  doc.setTextColor('white');
  doc.text('Location', this._left + 3, line + 5);
  doc.setTextColor('black');
  doc.rect(this._left + width, line, colWidth, 9, 'S');
  doc.rect(this._left + width + (colWidth * 1), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 2), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 3), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 4), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 5), line, colWidth, rowHeight, 'S');

  doc.setFontSize(9);
  let textLine = line + 4;
  let textLeft =  this._left + width + 1;
  doc.text('Head\n   1', textLeft, textLine);
  doc.text('Torso\n  2-4', textLeft + (colWidth * 1), textLine);
  doc.text('R.Arm\n   5', textLeft + (colWidth * 2), textLine);
  doc.text('L.Arm\n   6', textLeft + (colWidth * 3), textLine);
  doc.text('R.Leg\n  7-8', textLeft + (colWidth * 4), textLine);
  doc.text('L.Leg\n  9-0', textLeft + (colWidth * 5), textLine);
  doc.setFontSize(this._fontSize);

  line = line + 10;
  doc.setFillColor('black');
  doc.rect(this._left, line, width, rowHeight, 'DF');
  doc.setTextColor('white');
  doc.text('Armor SP', this._left + 3, line + 5);
  doc.setTextColor('black');
  doc.rect(this._left + width, line, colWidth, 9, 'S');
  doc.rect(this._left + width + (colWidth * 1), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 2), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 3), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 4), line, colWidth, rowHeight, 'S');
  doc.rect(this._left + width + (colWidth * 5), line, colWidth, rowHeight, 'S');

  doc.setFontSize(9);
  textLine = line + 6;
  textLeft =  this._left + width;
  this.createTextField(doc, armor.headSP.toString(), textLeft, line, colWidth, this._lineheight, null, 'center');
  this.createTextField(doc, armor.torsoSP.toString(), textLeft + (colWidth * 1), line, colWidth, this._lineheight, null, 'center');
  this.createTextField(doc, armor.rArmSP.toString(), textLeft + (colWidth * 2), line, colWidth, this._lineheight, null, 'center');
  this.createTextField(doc, armor.lArmSP.toString(), textLeft + (colWidth * 3), line, colWidth, this._lineheight, null, 'center');
  this.createTextField(doc, armor.rLegSP.toString(), textLeft + (colWidth * 4), line, colWidth, this._lineheight, null, 'center');
  this.createTextField(doc, armor.lLegSP.toString(), textLeft + (colWidth * 5), line, colWidth, this._lineheight, null, 'center');
  doc.setFontSize(this._fontSize);

  return line + 10;
}

private addWoundRow(doc: jsPDF, save: number, btm: number, line: number): number {
  doc.rect(this._left, line, 13, this._lineheight, 'S');
  doc.text('SAVE', this._left + 1, line + 5);
  this.createTextField(doc, save.toString(), this._left, line + this._lineheight, 13, 15, 12, 'center');

  const left = this._left + 14;
  doc.rect(left, line, 13, this._lineheight, 'S');
  doc.text('BTM', left + 2, line + 5);
  this.createTextField(doc, btm.toString(), left, line + this._lineheight, 13, 15, 12, 'center');

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

private addWounds(doc: jsPDF, level: string, stun: number, line: number, left: number, width: number) {
  doc.setFontSize(7);
  doc.text(level, left, line);
  line = line + 1;
  for ( let i = 0; i < 4; i++ ) {
    const box = new AcroFormCheckBox();
    box.x = left + (i * 2);
    box.y = line;
    box.height = 2;
    box.width = 2;
    box.appearanceState = 'Off';
    box.showWhenPrinted = true;
    doc.addField(box);
    doc.rect(left + (i * 2), line, 2, 2, 'S');
  }
  line = line + 2.4;
  doc.rect(left, line, width, 4, 'DF');
  doc.setTextColor('white');
  doc.text( `Stun=${stun}`, left + 1, line + 2.5 );
  doc.setTextColor('black');
  doc.setFontSize(this._fontSize);
}

private addSkills(doc: jsPDF, sa: Cp2020PlayerSkill, skills: Cp2020PlayerSkills, stats: Cp2020StatBlock, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(this._left, line, 22, this._lineheight, 'DF');
  doc.setTextColor('white');
  doc.setFont(this._font, 'bold');
  doc.text('SKILLS', left + 3, line + 5);
  doc.setTextColor('black');
  doc.setFont(this._font, 'normal');
  doc.setFontSize(6);
  doc.text('Skills show level| level + stat in box []. X next to box is chipped', left + 23, line + 3);
  line += 7;
  const colWidth = 50;
  let col = left;
  const startLine = line + 4;
  doc.setFontSize(9);
  doc.text('SPECIAL ABILITY', left, startLine);
  line += 7;
  doc.setFontSize(8);
  doc.text(sa.name, col, line);
  doc.text(`[${sa.value}|${sa.value}]`, col + 35, line);
  // ATTR SKILLS
  line = this.printSkills(doc, skills.ATTR, 'ATTR', stats.ATTR.Adjusted, line, col);
  // BODY SKILLS
  line = this.printSkills(doc, skills.BODY, 'BODY', stats.BODY.Adjusted, line, col);
  // COOL SKILLS
  line = this.printSkills(doc, skills.COOL, 'COOL/WILL', stats.COOL.Adjusted, line, col);
  // EMPATHY SKILLS
  line = this.printSkills(doc, skills.EMP, 'EMPATHY', stats.EMP.Adjusted, line, col);
  // INT SKILLS
  line = this.printSkills(doc, skills.INT.splice(0, 21), 'INT', stats.INT.Adjusted, line, col);

  col += colWidth;
  line = startLine;
  line = this.printSkills(doc, skills.INT.splice(21), '', stats.INT.Adjusted, line, col);
  // REF SKILLS
  line = this.printSkills(doc, skills.REF, 'REF', stats.REF.Adjusted, line, col);

  // TECH SKILLS
  line = this.printSkills(doc, skills.TECH.splice(0, 6), 'TECH', stats.TECH.Adjusted, line, col);

  col += colWidth;
  line = startLine;
  line = this.printSkills(doc, skills.TECH.splice(6), '', stats.TECH.Adjusted, line, col);
  col += colWidth;
  line = startLine;
  line = this.printSkills(doc, skills.Other, '', 0, line, col);
  doc.setFontSize(9);
  doc.setFont(this._font, 'bold');
  doc.text('REP', col, line + 4);
  doc.setFont(this._font, 'normal');
  doc.text(skills.rep.toString(), col + 40, line + 4);
  line += 6;
  doc.setFont(this._font, 'bold');
  doc.text('CURRENT IP', col, line + 4);
  doc.setFont(this._font, 'normal');
  doc.text(skills.ip.toString(), col + 40, line + 4);
  line += 6;
  doc.setFont(this._font, 'bold');
  doc.text('HUMANITY', col, line + 4);
  doc.setFont(this._font, 'normal');
  doc.text(stats.Humanity.toString(), col + 40, line + 4);
  line += 6;
}

private printSkills(doc: jsPDF, skills: Array<Cp2020PlayerSkill>, statName: string, stat: number, line: number, col: number): number {
  if (statName && statName !== '') {
    doc.setFontSize(9);
    doc.text(statName, col, line + 4);
    line += 7;
  }
  doc.setFontSize(8);
  skills.forEach( s => {
    const name = s.name + ((s.option) ? ` - ${s.option}` : '');
    doc.text(name, col, line);
    doc.text(`[${s.value}|${s.value + stat}] ${(s.chipped) ? 'X' : ''}`, col + 38, line);
    line += 4;
  });
  return line;
}

private addCyberware(doc: jsPDF, cyber: Cp2020PlayerCyberList, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(left, line, 100, 7, 'DF');
  doc.setTextColor('white');
  doc.setFont(this._font, 'bold');
  doc.text('CYBERNETICS', left + 2, line + 5);
  doc.setTextColor('black');
  doc.setFont(this._font, 'normal');
  line += 7;
  doc.setFontSize(8);
  const ht = 6;
  // header
  doc.rect(left, line, 80, ht, 'S');
  doc.rect(left + 80, line, 10, ht, 'S');
  doc.rect(left + 90, line, 10, ht, 'S');
  doc.text('Type', left + 2, line + 4);
  doc.text('HL', left + 81, line + 4);
  doc.text('Cost', left + 91, line + 4);
  line += ht;
  cyber.items.forEach(c => {
    let cyberName = new Array<string>();
    cyberName = doc.splitTextToSize(c.toString(), 79);
    const rectHt = cyberName.length * ht;
    const rectLine = line;
    this.createMultiLinField(doc, c.toString(), left, rectLine, 80, rectHt, 9);
    this.createTextField(doc, ((c.totalHL) ? c.totalHL.toString() : ''), left + 80, rectLine, 10, rectHt, 9, 'center');
    this.createTextField(doc, ((c.totalCost) ? c.totalCost.toLocaleString('en') : ''), left + 90, rectLine, 10, rectHt, 9, 'right');
    line += rectHt;
  });

  // footer
  doc.rect(left, line, 80, ht, 'S');
  doc.rect(left + 80, line, 10, ht, 'S');
  doc.rect(left + 90, line, 10, ht, 'S');
  doc.text('Total HL and Cost', left + 2, line + 4);
  doc.text((cyber.totalHL) ? cyber.totalHL.toString()  : '', left + 81, line + 4);
  doc.text(cyber.totalCost ? cyber.totalCost.toLocaleString('en') : '', left + 91, line + 4);
}

private addGear(doc: jsPDF, gear: Cp2020PlayerGearList, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(left, line, 100, 7, 'DF');
  doc.setTextColor('white');
  doc.setFont(this._font, 'bold');
  doc.text('GEAR', left + 2, line + 5);
  doc.setTextColor('black');
  doc.setFont(this._font, 'normal');
  line += 7;
  doc.setFontSize(9);
  const ht = 6;
  // header
  doc.rect(left, line, 80, ht, 'S');
  doc.rect(left + 80, line, 10, ht, 'S');
  doc.rect(left + 90, line, 10, ht, 'S');
  doc.text('type', left + 2, line + 4);
  doc.text('Cost', left + 81, line + 4);
  doc.text('Wt', left + 91, line + 4);
  line += ht;
  gear.items.forEach(g => {
    doc.rect(left, line, 80, ht, 'S');
    doc.rect(left + 80, line, 10, ht, 'S');
    doc.rect(left + 90, line, 10, ht, 'S');
    doc.text(g.gear, left + 1, line + 4);
    const cost: string = (g.cost) ? g.cost.toString() : '';
    const wt: string =  (g.weight) ? g.weight.toString() : '';
    doc.text(cost, left + 81, line + 4);
    doc.text(wt, left + 91, line + 4);
    line += ht;
  });
  doc.setFontSize(this._fontSize);
}

private addWeapons(doc: jsPDF, weapons: CpPlayerWeaponList, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(left, line, 100, 7, 'DF');
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
  doc.text('type', left +  0.5, line + 4);
  left += 8;

  doc.rect(left, line, 8, ht, 'S');
  doc.text('WA', left +  0.5, line + 4);
  left += 8;

  doc.rect(left, line, 8, ht, 'S');
  doc.text('Conc.', left +  0.5, line + 4);
  left += 8;

  doc.rect(left, line, 8, ht, 'S');
  doc.text('Avail.', left +  0.5, line + 4);
  left += 8;

  doc.rect(left, line, 12, ht, 'S');
  doc.text('Dam.', left +  0.5, line + 4);
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

  line += ht;
  weapons.items.forEach(w => {
    left = leftMargin;
    const textLine = line + 3.5;
    doc.rect(left, line, 30, ht, 'S');
    doc.text((w.name) ? w.name : '', left + 1, textLine);
    left += 30;

    doc.rect(left, line, 8, ht, 'S');
    doc.text((w.type) ? w.type : '', left +  0.5, textLine);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text(((w.wa) ? w.wa.toString() : ''), left +  0.5, textLine);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text((w.conc) ? w.conc : '', left +  0.5, textLine);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text((w.avail) ? w.avail : '', left +  0.5, textLine);
    left += 8;

    doc.rect(left, line, 12, ht, 'S');
    doc.text((w.damage) ? w.damage : '', left +  0.5, textLine);
    left += 12;

    doc.rect(left, line, 10, ht, 'S');
    doc.text(((w.shots) ? w.shots.toString() : ''), left + 0.5, textLine);
    left += 10;

    doc.rect(left, line, 9, ht, 'S');
    doc.text(((w.rof) ? w.rof.toString() : ''), left + 0.5, textLine);
    left += 9;

    doc.rect(left, line, 7, ht, 'S');
    doc.text((w.rel) ? w.rel : '', left + 0.5, textLine);
    left += 7;
    line += ht;


    if (w.shots && w.shots > 1) {
      const startLine = line;
      let shotLine = ht;
      left = leftMargin + 5;
      for (let i = 0; i < w.shots; i++) {
        doc.rect(left, line + 1, 2, 2, 'S');
        left += 3;
        if ( (i + 1) % 30 === 0) {
          left = leftMargin + 5;
          line += ht;
          shotLine += ht;
        }
      }
      doc.rect(leftMargin, startLine, 100, shotLine, 'S');
      line += ht;
    }

    if ((w.notes && w.notes !== '') || w.thrown) {
      const text = (w.thrown ? 'Thrown. ' : '') + (w.notes ? w.notes : '');
      let notes = new Array<string>();
      notes = doc.splitTextToSize(text, 90);
      let rectHt = ht;
      const rectLine = line;
      notes.forEach( txt => {
        doc.text(txt, leftMargin + 2, line + 3.5);
        line += ht;
        rectHt += ht;
      });
      doc.rect(leftMargin, rectLine, 100, rectHt, 'S');
    }
  });
  doc.setFontSize(this._fontSize);
}

private addLifePath(doc: jsPDF, lifepath: LifePathResults, left: number, line: number) {
  doc.rect(left, line, 90, this._pageHeight - line, 'S');
  const ht = 6.5;
  const recth = 6;
  doc.setFont(this._font, 'bold');
  doc.text('LIFEPATH', left + 2, line + 5);
  doc.setFillColor('black');
  line += ht;
  // Style
  doc.rect(left, line, 20, recth, 'FD');
  doc.setTextColor('white');
  doc.text('Style', left + 2, line + 4);
  doc.setTextColor('black');
  line += ht;
  doc.text('Clothes', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.appearance.clothes, left + 20, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Hair', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.appearance.hairstyle, left + 17, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Affectations', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.appearance.affectations, left + 25, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Ethnicity', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.ethnicity.name, left + 20, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Language', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.ethnicity.language, left + 22, line + 5);
  line += ht;

  // Family
  doc.setFont(this._font, 'bold');
  doc.setFillColor('black');
  doc.rect(left, line, 40, recth, 'FD');
  doc.setTextColor('white');
  doc.text('Family Background', left + 2, line + 4);
  doc.setTextColor('black');

  line += ht;
  doc.setFont(this._font, 'normal');
  if ( lifepath.family.familyRanking && lifepath.family.familyRanking !== '') {
    doc.text('Ranking: ' + lifepath.family.familyRanking, left + 5, line + 4);
  }
  line += ht;
  let fam = new Array<string>();
  if (lifepath.family.familyBackground && lifepath.family.familyBackground !== '') {
    fam = doc.splitTextToSize(lifepath.family.familyBackground, 90);
  }
  for ( let i = 0; i < 4; i++) {
    if ( fam[i] ) {
      doc.text(fam[i].trim(), left + 5, line + 4);
    }
    line += ht;
  }

  doc.setFont(this._font, 'bold');
  doc.setFillColor('black');
  doc.rect(left, line, 25, recth, 'FD');
  doc.setTextColor('white');
  doc.text('# Siblings', left + 2, line + 4);
  doc.setTextColor('black');
  doc.setFont(this._font, 'normal');
  const bro = lifepath.family.siblings.getBrothersCount().toString();
  const sis = lifepath.family.siblings.getSistersCount().toString();
  doc.text(
    `${bro} brothers   ${sis} sisters`, left + 27, line + 4
  );

  line += ht;

  // Motivations
  doc.setFillColor('black');
  doc.rect(left, line, 25, recth, 'FD');
  doc.setTextColor('white');
  doc.text('Motivations', left + 2, line + 4);
  doc.setTextColor('black');
  line += ht;
  doc.text('Traits: ', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.motivations.personality, left + 18, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Valued Person: ', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.motivations.valuedperson, left + 28, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Value Most: ', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.motivations.valuemost, left + 23, line + 5);
  line += ht;
  const feel = (lifepath.motivations.feelaboutpeople.length > 30) ?
    lifepath.motivations.feelaboutpeople.substring(0, 30) + '...' : lifepath.motivations.feelaboutpeople;
    doc.setFont(this._font, 'bold');
  doc.text('Feel About People: ', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(feel, left + 35, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');
  doc.text('Valued Possesion: ', left + 5, line + 5);
  doc.setFont(this._font, 'normal');
  doc.text(lifepath.motivations.valuedpossession, left + 35, line + 5);
  line += ht;
  doc.setFont(this._font, 'bold');

  // Life Events
  doc.rect(left, line, 25, recth, 'FD');
  doc.setTextColor('white');
  doc.text('Life Events', left + 2, line + 4);
  doc.setTextColor('black');
  line += ht;
  doc.setFontSize(8);
  doc.setFont(this._font, 'normal');
  doc.setTextColor('black');
  doc.rect(left, line, 10, recth, 'S');
  doc.text('YEAR', left + 1, line + 5);
  doc.rect(left + 10, line, 80, recth, 'S');
  doc.text('EVENT', left + 12, line + 5);
  line += ht;
  lifepath.events.forEach( e => {
    if (e.event && e.event.trim() !== '') {
      const details: Array<string> = doc.splitTextToSize(e.event, 77);
      const h = (recth * details.length) + 1;
      doc.rect(left, line, 10, h, 'S');
      doc.text(e.age ? e.age.toString() : '', left + 1, line + 5);
      doc.rect(left + 10, line, 80, h, 'S');
      let lineHt = line - 1;
      details.forEach( d => {
        doc.text(d.trim(), left + 11, lineHt + 5);
        lineHt += 5;
      });
      line += h;
    } else {
      doc.rect(left, line, 10, recth, 'S');
      doc.text(e.age ? e.age.toString() : '', left + 1, line + 5);
      doc.rect(left + 10, line, 80, recth, 'S');
      doc.text('', left + 11, line + 5);
      line += ht;
    }
  });


  doc.setFont(this._font, 'normal');
}

private createTextField(doc: jsPDF, value: string, x: number, y: number, width: number, height: number, fontSize?: number, align?: string) {
  const handleField = new AcroFormTextField();
  handleField.value = value;
  handleField.height = height;
  handleField.width = width;
  handleField.x = x;
  handleField.y = y;
  handleField.fontName = this._font;
  handleField.color = 'black';
  handleField.fontSize = fontSize ? fontSize : this._fontSize;
  handleField.textAlign = (align === 'center') ? 'center' : (align === 'right') ? 'right' : 'left';
  doc.addField(handleField);
  doc.rect(x, y, width, height, 'S');
}

private createMultiLinField(doc: jsPDF, value: string, x: number, y: number,
  width: number, height: number, fontSize?: number, align?: string) {
  const field = new AcroFormTextField();
  field.value = value;
  field.height = height;
  field.width = width;
  field.x = x;
  field.y = y;
  field.multiline = true;
  field.fontName = this._font;
  field.color = 'black';
  field.fontSize = fontSize ? fontSize : this._fontSize;
  field.textAlign = (align === 'center') ? 'center' : (align === 'right') ? 'right' : 'left';
  doc.addField(field);
  doc.rect(x, y, width, height, 'S');
}

private createStatField(doc: jsPDF, statName: string, statValue: string, x: number, y: number) {
  const boxWidth = 8;
  const boxHeight = this._lineheight - 2.5;
  doc.text(statName, x, y);
  const boxX = (statName.length === 3) ? 9 : ((statName.length > 3) ? 12 : 7);
  this.createTextField(doc, statValue, x + boxX, y - 4, boxWidth, boxHeight, null, 'center')
}

}
