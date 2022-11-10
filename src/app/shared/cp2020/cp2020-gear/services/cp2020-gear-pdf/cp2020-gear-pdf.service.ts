import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { Cp2020PlayerGearList, Cp2020PlayerGear } from './../../models';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020GearPdfService {
  private _ht = 6;
  constructor() {}

  addGearSection(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    left: number,
    line: number,
    ht: number
  ): number {
    return this.addGear(doc, gear, left, line, ht);
  }

  private addGear(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    left: number,
    line: number,
    ht: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text('GEAR', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 7;
    doc.setFontSize(9);
    this.addRowHeader(doc, left, line, ht);
    line += ht;

    const count = Math.ceil(gear.items.length / 2);
    for (let i = 0; i < count; i++) {
      line = this.addGearRow(doc, gear, i, i + count, left, line, ht);
    }

    doc.setFontSize(PdfPageSettings.FONT_SIZE);
    line += ht;
    return line;
  }

  private addRowHeader(
    doc: jsPDF,
    left: number,
    line: number,
    ht: number
  ): number {
    this.addColumnHeader(doc, left, line, ht);
    line = this.addColumnHeader(doc, PdfPageSettings.MIDPAGE, line, ht);
    return line;
  }

  private addColumnHeader(
    doc: jsPDF,
    left: number,
    line: number,
    ht: number
  ): number {
    // header
    doc.rect(left, line, 80, ht, 'S');
    doc.rect(left + 80, line, 10, ht, 'S');
    doc.rect(left + 90, line, 10, ht, 'S');
    doc.text('type', left + 2, line + 4);
    doc.text('Cost', left + 81, line + 4);
    doc.text('Wt', left + 91, line + 4);
    return line + ht;
  }

  addGearRow(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    indexOne: number,
    indexTwo: number,
    left: number,
    line: number,
    ht: number
  ): number {
    // determine how tall the cell is and apply new page if needed.
    const gearOneName: Array<string> = doc.splitTextToSize(
      gear.items[indexOne].gear,
      80
    );
    const gearTwoName: Array<string> = doc.splitTextToSize(
      gear.items[indexTwo].gear,
      80
    );

    let cellHt = gearOneName.length * ht;
    cellHt =
      gearTwoName.length * ht > cellHt ? gearTwoName.length * ht : cellHt;

    if (line + cellHt > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = this.addRowHeader(doc, left, PdfPageSettings.MARGIN_TOP, ht);
    }

    let gearCost = gear.items[indexOne]?.cost?.toString() ?? '';
    let gearWt = gear.items[indexOne]?.weight?.toString() ?? '';
    const cellOne = this.addGearCell(
      doc,
      gearOneName,
      gearCost,
      gearWt,
      cellHt,
      left,
      line,
      ht
    );

    gearCost = gear.items[indexTwo]?.cost?.toString() ?? '';
    gearWt = gear.items[indexTwo]?.weight?.toString() ?? '';
    const cellTwo = this.addGearCell(
      doc,
      gearTwoName,
      gearCost,
      gearWt,
      cellHt,
      PdfPageSettings.MIDPAGE,
      line,
      ht
    );
    return line + cellHt;
  }

  private addGearCell(
    doc: jsPDF,
    gearName: Array<string>,
    cost: string,
    wt: string,
    cellHt: number,
    left: number,
    line: number,
    ht: number
  ): number {
    doc.rect(left, line, 80, cellHt, 'S');
    doc.rect(left + 80, line, 10, cellHt, 'S');
    doc.rect(left + 90, line, 10, cellHt, 'S');
    gearName.forEach((name) => {
      doc.text(name, left + 1, line + 4);
    });
    doc.text(cost, left + 81, line + 4);
    doc.text(wt, left + 91, line + 4);
    return cellHt;
  }
}
