import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { Cp2020ArmorBlock } from './../../models/cp2020-armor-block';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020ArmorPDFSectionService {
  private _font = PdfPageSettings.DEFAULT_FONT.toString();
  private _left = PdfPageSettings.MARGIN_LEFT.valueOf();
  private _optionWidth = 35;

  constructor() { }

  createCp2020ArmorSection(doc:jsPDF, armorBlock: Cp2020ArmorBlock, font: string, leftMargin: number, line: number): number {
    this._font = font;
    this._left = leftMargin;
    line = this.updateLine(doc, line, 20);
    // create section title
    line = this.addSectionTitle(doc, line);
    // create row header
    line = this.addArmorRowHeader(doc, 5, line);
    // create armor row
    line = this.addArmor(doc, armorBlock, 5, this._left, line);
    // create row footer
    return line;
  }

  createCP2020ArmorTable(doc:jsPDF, armorBlock: Cp2020ArmorBlock, font: string, leftMargin: number, line: number): number {
    this._font = font;
    this._left = leftMargin;

    return line;
  }

  private addSectionTitle(doc: jsPDF, line: number): number {
    doc.setFillColor('black');
    doc.rect(this._left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('ARMOR/CLOTHING', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(7);
    return line + 7;
  }

  private addArmorRowHeader(doc: jsPDF, ht: number, line: number): number {
    let left = this._left;
    doc.setFont(this._font, 'bold');
    line = this.addRow(doc, left, ht, line, 'Name', 'Head', 'Torso', 'R Arm', 'L Arm', 'R Leg', 'L Leg', 'EV', 'Type', 'Cost', ['Options']);
    doc.setFont(this._font, 'normal');
    return line;
  }

  private addRow(doc: jsPDF,left: number, ht: number, line: number,
    name: string, head: string, torso: string, rarm: string,larm:string, rleg: string, lleg: string,
    ev: string, type: string, cost: string, options: Array<string> ) {
      doc.rect(left, line, 70, ht, 'S');
      doc.text(name, left + 1, line + 4);
      left += 70;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(head, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(torso, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(rarm, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(larm, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(rleg, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(lleg, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(ev, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 10, ht, 'S');
      doc.text(type, left + 5, line + 4, {align: 'center'});
      left += 10;
      doc.rect(left, line, 15, ht, 'S');
      doc.text(cost, left + 13, line + 4, {align: 'right'});
      left += 15;
      doc.rect(left, line, this._optionWidth, ht, 'S');
      let lineHt = 4;
      options.forEach( opt => {
        doc.text(opt, left + 1, line + lineHt);
        lineHt += 4;
      });
      return line + ht;
  }

  private addArmor(doc: jsPDF, armor: Cp2020ArmorBlock, ht: number, left: number, line: number): number {
    const leftMargin = left;
    armor.armorPieces.forEach( layer => {
      const options = layer.options.map(opt => opt.name).join(', ');
      const optText = doc.splitTextToSize(options, this._optionWidth - 2);
      line = this.updateLine(doc, line, ht);
      const name = doc.splitTextToSize(`${layer.isActive ? '* ':''}${layer.name}`, 65);
      const head = layer.locations?.head?.toString() ?? '';
      const torso = layer.locations?.torso?.toString() ?? '';
      const rarm = layer.locations?.rarm?.toString() ?? '';
      const larm = layer.locations?.larm?.toString() ?? '';
      const rleg = layer.locations?.rleg?.toString() ?? '';
      const lleg = layer.locations?.lleg?.toString() ?? '';
      const type = layer.isSkinWeave ? 'Cyber' : (layer.isHard) ? 'Hard' : 'Soft';
      const ev = layer.ev.toLocaleString();
      const cost =  `${layer.cost.toLocaleString()}eb`;
      const rowHt = 5 * (optText.length || 1);
      line = this.addRow(doc, leftMargin, rowHt, line, name[0],
        head, torso, rarm, larm, rleg, lleg, ev, type, cost, optText);
    });
    return line;
  }

  private updateLine(doc: jsPDF, line: number, ht: number): number {
    if( (line + ht ) > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      return PdfPageSettings.MARGIN_TOP;
    }
    return line;
  }
}
