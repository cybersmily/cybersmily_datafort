import { PdfFontSize, PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Cp2020PlayerSkill, Cp2020PlayerSkills } from '../../models';
import { Cp2020StatBlock } from '../../../cp2020-stats/models';

@Injectable({
  providedIn: 'root'
})
export class Cp2020SkillSectionPdService {

  constructor() { }

  addCharacterSheetSkillsSection(
    doc: jsPDF,
    currSkills: Cp2020PlayerSkills,
    stats: Cp2020StatBlock,
    left: number,
    line: number,
    lineheight: number
  ): number {
    return this.addSkills(doc, currSkills, stats, left, line, lineheight);
  }


  private addSkills(
    doc: jsPDF,
    currSkills: Cp2020PlayerSkills,
    stats: Cp2020StatBlock,
    left: number,
    line: number,
    lineheight: number
  ): number {
    line = this.printSkillSectionTitle(
      doc,
      line,
      left,
      currSkills.ip.toString(),
      lineheight
    );
    const skills = new Cp2020PlayerSkills();
    skills.importSkills(
      currSkills.showWithValues
        ? (skills.skills = currSkills.skills.filter((sk) => sk.value > 0))
        : currSkills.skills
    );
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
      left,
      col
    );

    // ATTR SKILLS
    line = this.printSkills(
      doc,
      skills.ATTR,
      'ATTR',
      stats.ATTR.Adjusted,
      line,
      left,
      col
    );
    // BODY SKILLS
    line = this.printSkills(
      doc,
      skills.BODY,
      'BODY',
      stats.BODY.Adjusted,
      line,
      left,
      col
    );
    // COOL SKILLS
    line = this.printSkills(
      doc,
      skills.COOL,
      'COOL/WILL',
      stats.COOL.Adjusted,
      line,
      left,
      col
    );
    // EMPATHY SKILLS
    line = this.printSkills(
      doc,
      skills.EMP,
      'EMPATHY',
      stats.EMP.Adjusted,
      line,
      left,
      col
    );
    // INT SKILLS
    line = this.printSkills(
      doc,
      skills.INT.slice(0, 92),
      'INT',
      stats.INT.Adjusted,
      line,
      left,
      col
    );
    if (skills.skills.length > 180 || skills.INT.length > 92) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP + 10;
      line = this.printSkillSectionTitle(doc, line, left,
        skills.ip.toString(),
        lineheight
        );
      line += 4;
      line = this.printSkills(
        doc,
        skills.INT.slice(92),
        'INT (continued)',
        stats.INT.Adjusted,
        line,
        left,
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
      left,
      col
    );

    // TECH SKILLS
    line = this.printSkills(
      doc,
      skills.TECH,
      'TECH',
      stats.TECH.Adjusted,
      line,
      left,
      col
    );

    line = this.printSkills(doc, skills.Other, 'OTHER', 0, line, left, col);
    line += 5;
    return line;
  }

  private printSkillSectionTitle(
    doc: jsPDF,
    line: number,
    left: number,
    ip: string,
    lineheight: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 22, lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text('SKILLS', left + 3, line + 5);
    doc.setTextColor('black');
    doc.rect(left + 20, line, 15, lineheight, 'S');
    doc.text('IP:', left + 23, line + 5);
    doc.text(ip, left + 28, line + 5);
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    doc.setFontSize(PdfFontSize.XS);
    doc.text(
      'Skills show level| level + stat in box []. © next to box is chipped',
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
    left: number,
    col: number
  ): number {
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.setFontSize(PdfFontSize.SM);
    doc.text(`${statName} (${stat ?? 'NA'})`, col + 1, line);
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    let currline = line + 4;
    doc.setFontSize(PdfFontSize.SM);
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
    doc.rect(left, line - 3, 200, colOne.length * 4 + 4, 'S');
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
        `[${s.value}|${s.value + (stat ?? 0)}]${s.chipped ? '©' : ''} ${name}`,
        col + 2,
        line
      );
      line += 4;
    });
  }
}
