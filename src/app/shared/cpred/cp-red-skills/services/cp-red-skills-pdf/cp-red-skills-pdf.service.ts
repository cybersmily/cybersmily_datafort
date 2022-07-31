import {
  CpRedCharacterStat,
  CpRedCharacterStats,
} from './../../../c-p-red-stats/models';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { CpRedCharacterSkill } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CpRedSkillsPdfService {
  private _nameWidth = 35;
  private _valueWidth = 10;
  constructor() {}

  drawSkillSection(
    skills: Array<CpRedCharacterSkill>,
    stats: CpRedCharacterStats,
    pdf: jsPDF,
    left: number,
    line: number,
    width: number,
    height: number,
    rowHt: number,
    fontSize: number
  ): void {
    pdf.setFillColor('red');
    pdf.setDrawColor('red');
    pdf.rect(left, line, width, height, 'DF');
    const groupedSkills = skills.sort((a, b) => a.type.localeCompare(b.type));
    let type = '';
    let newline = line + 2;
    let margin = left + 2;
    const rowLength = Math.floor((groupedSkills.length + 11) / 3);
    let counter = 0;
    groupedSkills.forEach((skill, index) => {
      if (type !== skill.type || counter === 0) {
        type = skill.type;
        this.drawHeader(type, pdf, margin, newline, rowHt, fontSize);
        newline += rowHt + 1;
        counter++;
      }
      const stat = stats[skill.stat] ?? new CpRedCharacterStat();
      this.drawSkill(skill, stat, pdf, margin, newline, rowHt, fontSize);
      newline += rowHt + 1;
      if (counter > rowLength) {
        counter = 0;
        margin += 70;
        newline = line + 2;
      } else {
        counter++;
      }
    });
    pdf
      .setTextColor('white')
      .setFont(undefined, 'bold')
      .text(
        '*- on LVL indicates modified lvl. @- Indicates skill is chipped.',
        left + 2,
        height + line - rowHt,
        { align: 'left' }
      );
  }

  /**
   * Draw the skill with its values in white boxes
   *
   * @private
   * @param {CpRedCharacterSkill} skill
   * @param {CpRedCharacterStat} stat
   * @param {jsPDF} pdf
   * @param {number} left
   * @param {number} line
   * @param {number} height
   * @param {number} fontSize
   * @return {*}  {number}
   * @memberof CpRedSkillsPdfService
   */
  private drawSkill(
    skill: CpRedCharacterSkill,
    stat: CpRedCharacterStat,
    pdf: jsPDF,
    left: number,
    line: number,
    height: number,
    fontSize: number
  ): number {
    pdf.setFont(undefined, skill.required ? 'bold' : 'normal');
    this.drawTextBox(
      `${skill.name} (${skill.stat.toUpperCase()})${
        skill.isChipped ? '@' : ''
      }`,
      pdf,
      left,
      line,
      this._nameWidth,
      height,
      fontSize,
      'left',
      'white',
      'black'
    );
    pdf.setFont(undefined, 'normal');
    let margin = left + this._nameWidth + 1;
    this.drawTextBox(
      `${skill.level}${skill.modifiers.length > 0 ? '*' : ''}`,
      pdf,
      margin,
      line,
      this._valueWidth,
      height,
      fontSize,
      'center',
      'white',
      'black'
    );
    margin += this._valueWidth + 1;
    this.drawTextBox(
      stat.modified.toString(),
      pdf,
      margin,
      line,
      this._valueWidth,
      height,
      fontSize,
      'center',
      'white',
      'black'
    );
    margin += this._valueWidth + 1;
    this.drawTextBox(
      `${skill.level + stat.modified}`,
      pdf,
      margin,
      line,
      this._valueWidth,
      height,
      fontSize,
      'center',
      'white',
      'black'
    );
    return line;
  }

  /**
   * Draws the Type sections in black boxes, that the skills are grouped in
   *
   * @private
   * @param {string} type
   * @param {jsPDF} pdf
   * @param {number} left
   * @param {number} line
   * @param {number} height
   * @param {number} fontSize
   * @return {*}  {number}
   * @memberof CpRedSkillsPdfService
   */
  private drawHeader(
    type: string,
    pdf: jsPDF,
    left: number,
    line: number,
    height: number,
    fontSize: number
  ): number {
    type = type[0].toUpperCase() + type.substring(1);
    pdf.setFont(undefined, 'bold');
    this.drawTextBox(
      `${type} Skills`,
      pdf,
      left,
      line,
      this._nameWidth,
      height,
      fontSize,
      'left',
      'black',
      'white'
    );
    let margin = left + this._nameWidth + 1;
    this.drawTextBox(
      `LVL`,
      pdf,
      margin,
      line,
      this._valueWidth,
      height,
      fontSize,
      'center',
      'black',
      'white'
    );
    margin += this._valueWidth + 1;
    this.drawTextBox(
      `STAT`,
      pdf,
      margin,
      line,
      this._valueWidth,
      height,
      fontSize,
      'center',
      'black',
      'white'
    );
    margin += this._valueWidth + 1;
    this.drawTextBox(
      `BASE`,
      pdf,
      margin,
      line,
      this._valueWidth,
      height,
      fontSize - 1,
      'center',
      'black',
      'white'
    );
    return line;
  }

  private drawTextBox(
    text: string,
    pdf: jsPDF,
    left: number,
    line: number,
    width: number,
    height: number,
    fontSize: number,
    txtAlign: 'left' | 'center',
    fillColor: string,
    textColor: string
  ): void {
    pdf
      .setFillColor(fillColor)
      .setDrawColor(fillColor)
      .rect(left, line, width, height, 'DF')
      .setFontSize(fontSize)
      .setTextColor(textColor);
    left = txtAlign === 'left' ? left + 1 : left + width / 2;
    pdf.text(text, left, line + height - 1, { align: txtAlign });
  }
}
