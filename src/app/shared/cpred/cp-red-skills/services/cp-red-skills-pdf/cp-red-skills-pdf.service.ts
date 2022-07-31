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
      this.drawSkill(skill, pdf, margin, newline, rowHt, fontSize);
      newline += rowHt + 1;
      if (counter > rowLength) {
        counter = 0;
        margin += 70;
        newline = line + 2;
      } else {
        counter++;
      }
    });
  }

  private drawSkill(
    skill: CpRedCharacterSkill,
    pdf: jsPDF,
    left: number,
    line: number,
    height: number,
    fontSize: number
  ): number {
    this.drawTextBox(
      `${skill.name} (${skill.stat.toUpperCase()})`,
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
    let margin = left + this._nameWidth + 1;
    this.drawTextBox(
      skill.base.toString(),
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
      skill.level.toString(),
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
      skill.modifierTotal.toString(),
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

  private drawHeader(
    type: string,
    pdf: jsPDF,
    left: number,
    line: number,
    height: number,
    fontSize: number
  ): number {
    type = type[0].toUpperCase() + type.substring(1);
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
    pdf.setFillColor(fillColor);
    pdf.setDrawColor(fillColor);
    pdf.rect(left, line, width, height, 'DF');
    pdf.setFontSize(fontSize);
    pdf.setTextColor(textColor);
    left = txtAlign === 'left' ? left + 1 : left + width / 2;
    pdf.text(text, left, line + height - 1, { align: txtAlign });
  }
}
