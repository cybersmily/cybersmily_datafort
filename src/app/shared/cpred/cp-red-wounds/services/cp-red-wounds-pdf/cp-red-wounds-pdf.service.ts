import { CpRedCharacterAddiction } from './../../models/cp-red-character-addiction';
import { CpRedCharacterWounds } from './../../models/cp-red-character-wounds';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { CpRedCharacterCriticalInjury } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CpRedWoundsPdfService {
  constructor() {}

  drawWoundsSection(
    wounds: CpRedCharacterWounds,
    pdf: jsPDF,
    left: number,
    line: number,
    width: number,
    height: number,
    fontSize: number
  ): void {
    pdf.setFont(undefined, 'normal');
    pdf.setDrawColor('red');
    pdf.setFillColor('red');
    pdf.rect(left, line, width, height, 'S');
    const halfWidth = Math.ceil(width / 2);
    const quaterWidth = Math.ceil(halfWidth / 2);
    pdf.setLineWidth(2.0);
    pdf.line(halfWidth + left, line, halfWidth + left, line + height);
    line += 2;
    this.drawHitPoints(pdf, wounds.hitPoints, left, line, halfWidth, fontSize);
    this.drawSeriousWounds(
      pdf,
      wounds.seriouslyWound,
      halfWidth + left,
      line,
      halfWidth,
      fontSize
    );
    line += 12;
    this.drawDeathSave(
      pdf,
      wounds.deathSave.base,
      left,
      line,
      halfWidth,
      fontSize
    );
    this.drawCriticalInjuries(
      pdf,
      wounds.criticalInjuries,
      halfWidth + left,
      line,
      halfWidth,
      fontSize
    );
    line += 12;
    this.drawAddictions(
      pdf,
      wounds.addictions,
      left,
      line,
      halfWidth,
      fontSize
    );
  }

  private drawHitPoints(
    pdf: jsPDF,
    hitPoints: { curr: number; base: number },
    left: number,
    line: number,
    width: number,
    fontSize: number
  ): void {
    pdf.setTextColor('black');
    pdf.setFontSize(fontSize * 0.6);
    const midPoint = Math.ceil(width / 2);
    pdf.text('Hit Points', width + left - 2, line + 2, { align: 'right' });
    pdf.setFontSize(fontSize);
    pdf.setLineWidth(3.0);
    pdf.line(midPoint + left, line + 3, midPoint + left, line + 10);
    line += 8;
    pdf.text(hitPoints.curr.toString(), left + 3, line);
    pdf.text(hitPoints.base.toString(), midPoint + left + 4, line);
    pdf.setLineWidth(0);
    pdf.line(left, line + 2, left + width, line + 2);
  }

  private drawSeriousWounds(
    pdf: jsPDF,
    seriouslyWound: number,
    left: number,
    line: number,
    width: number,
    fontSize: number
  ): void {
    pdf.setTextColor('black');
    const midPoint = Math.ceil(width / 2);
    pdf.setFontSize(fontSize * 0.6);
    pdf.text('Seriously', left + 2, line + 3);
    pdf.text('Wounded', left + 2, line + 7);
    pdf.setFontSize(fontSize);
    line += 7;
    pdf.text(seriouslyWound.toString(), midPoint + left + 6, line - 0.5);
    pdf.setLineWidth(0.0);
    line += 3;
    pdf.line(left, line, left + width, line);
  }

  private drawDeathSave(
    pdf: jsPDF,
    deathSave: number,
    left: number,
    line: number,
    width: number,
    fontSize: number
  ): void {
    pdf.setTextColor('black');
    const midPoint = Math.ceil(width / 2);
    pdf.setFontSize(fontSize * 0.6);
    pdf.text('Death', left + 2, line + 3);
    pdf.text('Save', left + 2, line + 7);
    pdf.setFontSize(fontSize);
    line += 7;
    pdf.text(deathSave.toString(), midPoint + left + 6, line - 0.5);
    pdf.setLineWidth(0.0);
    line += 3;
    pdf.line(left, line, left + width, line);
  }

  private drawCriticalInjuries(
    pdf: jsPDF,
    injuries: Array<CpRedCharacterCriticalInjury>,
    left: number,
    line: number,
    width: number,
    fontSize: number
  ): void {
    pdf.setTextColor('gray');
    const midPoint = Math.ceil(width / 2);
    pdf.setFontSize(fontSize * 0.6);
    pdf.text('Critical Injury', left + 2, line + 3);
    pdf.setTextColor('black');
    pdf.setFontSize(fontSize * 0.5);
    line += 6;
    injuries.forEach((injury) => {
      const name = pdf.splitTextToSize(injury.name, width - 3);
      pdf.text(`${name[0]}${name.length > 1 ? '...' : ''}`, left + 2, line);
      line += 3;
    });
  }

  private drawAddictions(
    pdf: jsPDF,
    injuries: Array<CpRedCharacterAddiction>,
    left: number,
    line: number,
    width: number,
    fontSize: number
  ): void {
    pdf.setTextColor('gray');
    const midPoint = Math.ceil(width / 2);
    pdf.setFontSize(fontSize * 0.6);
    pdf.text('Addictions', left + 2, line + 3);
    pdf.setTextColor('black');
    pdf.setFontSize(fontSize * 0.5);
    line += 6;
    injuries.forEach((addiction) => {
      const name = pdf.splitTextToSize(addiction.name, width - 3);
      pdf.text(`${name[0]}${name.length > 1 ? '...' : ''}`, left + 2, line);
      line += 3;
    });
  }
}
