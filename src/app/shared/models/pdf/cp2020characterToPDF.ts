import { CpPlayerWeaponList } from './../weapon/cp-player-weapon-list';
import { Cp2020PlayerGearList } from './../cp2020character/cp2020-player-gear-list';
import { Cp2020ArmorBlock } from './../cp2020character/cp2020-armor-block';
import { Cp2020StatBlock } from './../cp2020character/cp2020-stat-block';
import { Cp2020PlayerCharacter } from '../cp2020character/cp2020-player-character';

import * as jsPDF from 'jspdf';

export class Cp2020characterToPDF {
  private _character: Cp2020PlayerCharacter;

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = 290;

  generatePdf( character: Cp2020PlayerCharacter) {
    this._character = character;
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    });
    doc.setFontSize(this._fontSize);
    this.createFirstPage(doc);
    this.createSecondPage(doc);
    this.createThirdPage(doc);
    doc.save('test.pdf');

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

    this.addSkills(doc, null);
    this.addCyberware(doc, null, this._midPage, 160);
  }

  createSecondPage( doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFontStyle('bold');
    doc.text('LIFEPATH, GEAR, & WEAPONS', this._left + 2, this._top + 5);
    doc.setTextColor('black');
    doc.setFontStyle('normal');

    this.addLifePath(doc, null, this._left, this._top + 10);
    this.addGear(doc, this._character.gear, this._midPage, this._top + 10);
    this.addWeapons(doc, this._character.weapons, this._midPage, 200);
  }

  createThirdPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFontStyle('bold');
    doc.text('HISTORY & NOTES', this._left + 2, this._top + 5);
    doc.setTextColor('black');
    doc.setFontStyle('normal');
    doc.rect(this._left, this._top, 200, this._pageHeight - this._top, 'S');

  }

  private addHandle(doc: jsPDF, handle: string, line: number) {
    let rw = 22;
    doc.rect(this._left, line, rw, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFontStyle('bold');
    doc.text('HANDLE:', this._left + 3, line + 5);
    rw = this._left + rw;
    doc.rect(rw, line, 70, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFontStyle('normal');
    doc.text(handle, rw + 1, line + 5);
  }

private addRole(doc: jsPDF, role: string, line: number) {
  doc.setFillColor('black');
  let rw = 22;
  doc.rect(this._left, line, rw, this._lineheight, 'DF');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.text('ROLE:', this._left + 3, line + 5);
  rw = this._left + rw;
  doc.rect(rw, line, 70, this._lineheight, 'S');
  doc.setTextColor('black');
  doc.setFontStyle('normal');
  doc.text(role, rw + 1, line + 5);
}

private addCharImage(doc: jsPDF) {
  doc.setTextColor('black');
  doc.rect(this._midPage, this._top, 100, 10, 'DF');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.setFontSize(15);
  doc.text('CYBERPUNK 2020', this._midPage + 20, this._top + 6);
  doc.roundedRect(this._midPage, this._top + 10, 100, 80, 0.5, 0.5, 'S');
  doc.setFontSize(this._fontSize);
}


private addStats(doc: jsPDF, stats: Cp2020StatBlock, line: number): number {
  doc.rect(this._left, line, 20, this._lineheight, 'DF');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.text('STATS', this._left + 3, line + 5);
  doc.rect(this._left + 20, line, 15, this._lineheight, 'S');
  doc.setTextColor('black');
  doc.setFontStyle('normal');
  doc.text(stats.BasePoints.toString(), this._left + 23, line + 5);


  line = line + 12;
  doc.setTextColor('black');
  doc.text(
    `INT [ ${stats.INT.Adjusted} ]   REF [ ${stats.REF.Adjusted} ]   TECH [ ${stats.TECH.Adjusted}]   COOL [ ${stats.COOL.Adjusted} ]`,
    this._left, line);
  line = line + 5.5;
  doc.text(
    `ATTR [ ${stats.ATTR.Adjusted} ]   LUCK [ ${stats.LUCK.Adjusted} ]   MA [ ${stats.MA.Adjusted} ]  BODY [ ${stats.COOL.Adjusted} ]`,
    this._left, line);
    line = line + 5.5;
  doc.text(`EMP [ ${stats.EMP.Adjusted} ]   Run [ ${stats.Run}m ]   Leap [ ${stats.Leap}m ]  Lift [ ${stats.Lift}kg ]`,
    this._left, line);
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
  textLeft =  this._left + width + 3;
  doc.text(armor.headSP.toString(), textLeft, textLine);
  doc.text(armor.torsoSP.toString(), textLeft + (colWidth * 1), textLine);
  doc.text(armor.rArmSP.toString(), textLeft + (colWidth * 2), textLine);
  doc.text(armor.lArmSP.toString(), textLeft + (colWidth * 3), textLine);
  doc.text(armor.rLegSP.toString(), textLeft + (colWidth * 4), textLine);
  doc.text(armor.lLegSP.toString(), textLeft + (colWidth * 5), textLine);
  doc.setFontSize(this._fontSize);

  return line + 10;
}

private addWoundRow(doc: jsPDF, save: number, btm: number, line: number): number {
  doc.rect(this._left, line, 13, this._lineheight, 'S');
  doc.text('SAVE', this._left + 1, line + 5);
  doc.rect(this._left, line + this._lineheight, 13, 15, 'S');
  doc.text(save.toString(), this._left + 4, line + this._lineheight + 8);

  const left = this._left + 14;
  doc.rect(left, line, 13, this._lineheight, 'S');
  doc.text('BTM', left + 2, line + 5);
  doc.rect(left, line + this._lineheight, 13, 15, 'S');
  doc.text(btm.toString(), left + 4, line + this._lineheight + 8);
  doc.setFontStyle('normal');
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
return line;
}

private addWounds(doc: jsPDF, level: string, stun: number, line: number, left: number, width: number) {
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
  doc.text( `Stun=${stun}`, left + 1, line + 2.5 );
  doc.setTextColor('black');
  doc.setFontSize(this._fontSize);
}

private addSkills(doc: jsPDF, skills: any) {
}

private addCyberware(doc: jsPDF, cyber: any, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(left, line, 100, 7, 'DF');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.text('CYBERNETICS', left + 2, line + 5);
  doc.setTextColor('black');
  doc.setFontStyle('normal');
}

private addGear(doc: jsPDF, gear: Cp2020PlayerGearList, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(left, line, 100, 7, 'DF');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.text('GEAR', left + 2, line + 5);
  doc.setTextColor('black');
  doc.setFontStyle('normal');
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
    doc.text(g.cost.toString(), left + 81, line + 4);
    doc.text(g.weight.toString(), left + 91, line + 4);
    line += ht;
  });
  doc.setFontSize(this._fontSize);
}

private addWeapons(doc: jsPDF, weapons: CpPlayerWeaponList, left: number, line: number) {
  doc.setFillColor('black');
  doc.rect(left, line, 100, 7, 'DF');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.text('WEAPONS', left + 2, line + 5);
  doc.setTextColor('black');
  doc.setFontStyle('normal');
  doc.setFontSize(8.5);
  const ht = 6;
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

  doc.rect(left, line,10, ht, 'S');
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
    doc.rect(left, line, 30, ht, 'S');
    doc.text((w.name) ? w.name : '', left + 1, line + 4);
    left += 30;

    doc.rect(left, line, 8, ht, 'S');
    doc.text((w.type) ? w.type : '', left +  0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text(((w.wa) ? w.wa.toString() : ''), left +  0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text((w.conc) ? w.conc : '', left +  0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text((w.avail) ? w.avail : '', left +  0.5, line + 4);
    left += 8;

    doc.rect(left, line, 12, ht, 'S');
    doc.text((w.damage) ? w.damage : '', left +  0.5, line + 4);
    left += 12;

    doc.rect(left, line, 10, ht, 'S');
    doc.text(((w.shots) ? w.shots.toString() : ''), left + 0.5, line + 4);
    left += 10;

    doc.rect(left, line, 9, ht, 'S');
    doc.text(((w.rof) ? w.rof.toString() : ''), left + 0.5, line + 4);
    left += 9;

    doc.rect(left, line, 7, ht, 'S');
    doc.text((w.rel) ? w.rel : '', left + 0.5, line + 4);
    left += 7;
    line += ht;
  });
  doc.setFontSize(this._fontSize);
}

private addLifePath(doc: jsPDF, lifepath: any, left: number, line: number) {
  doc.rect(left + 0.5, line, 90, this._pageHeight - line, 'S');
}

}
