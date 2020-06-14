import { Cp2020ArmorBlock } from './../cp2020character/cp2020-armor-block';
import { Cp2020StatBlock } from './../cp2020character/cp2020-stat-block';
import { Cp2020PlayerCharacter } from '../cp2020character/cp2020-player-character';

import * as jsPDF from 'jspdf';

export class Cp2020characterToPDF {
  private _character: Cp2020PlayerCharacter;

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 100;
  private _fontSize = 11;

  generatePdf( character: Cp2020PlayerCharacter) {
    this._character = character;
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    });
    doc.setFontSize(this._fontSize);
    this.createFirstPage(doc);
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
  }

  private addHandle(doc: jsPDF, handle: string, line: number) {
    let rw = 22;
    doc.rect(this._left, line, rw, this._lineheight, 'F');
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
  doc.rect(this._left, line, rw, this._lineheight, 'F');
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
  doc.rect(this._midPage, this._top, 100, 10, 'F');
  doc.setTextColor('white');
  doc.setFontStyle('bold');
  doc.setFontSize(15);
  doc.text('CYBERPUNK 2020', this._midPage + 20, this._top + 6);
  doc.roundedRect(this._midPage, this._top + 10, 100, 80, 0.5, 0.5, 'S');
  doc.setFontSize(this._fontSize);
}


private addStats(doc: jsPDF, stats: Cp2020StatBlock, line: number): number {
  doc.rect(this._left, line, 20, this._lineheight, 'F');
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
  doc.rect(this._left, line, width, rowHeight, 'F');
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
  doc.rect(this._left, line, width, rowHeight, 'F');
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
  doc.rect(left, line, width, 4, 'F');
  doc.setTextColor('white');
  doc.text( `Stun=${stun}`, left + 1, line + 2.5 );
  doc.setTextColor('black');
  doc.setFontSize(this._fontSize);
}

private addSkills(doc: jsPDF, skills: any) {}

private addCyberware(doc: jsPDF, cyber: any, left: number, line: number) {

}

}
