import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { Cp2020PlayerGearList, Cp2020PlayerGear } from './../../models';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020GearPdfService {
  private _ht = 6;
  private _font = 'Arial';
  constructor() {
  }

  addGearSection(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    left: number,
    line: number,
    ht: number
  ): number {
    this._font = this.getFont(doc.getFontList());
    return this.addGear(doc, gear, left, line, ht);
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

  private addGear(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    left: number,
    line: number,
    ht: number
  ): number {
    if (PdfPageSettings.LINEHEIGHT * 3 + line > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }

    line = this.addSectionHeader(doc, left, line, ht);

    doc.setFontSize(9);
    line = this.addLocationSection(doc, gear, '', left, line, ht);
    gear.locations.forEach(location => {
      line = this.addLocationSection(doc, gear, location, left, line, ht);
    })

    doc.setFontSize(PdfPageSettings.FONT_SIZE);
    line += ht;
    return line;
  }

  private addSectionHeader( doc: jsPDF,
    left: number,
    line: number,
    ht: number): number {
    doc.setFillColor('black');
    doc.rect(left, line, 200, ht, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('GEAR', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    line += ht;
    return line;
  }

  private addLocationHeader( location: string, doc: jsPDF,
    left: number,
    line: number, ht: number): number {
    doc.setTextColor('black');
    doc.setFont(this._font, 'bold');
    doc.rect(left, line, 200, ht, 'S');
    doc.text(location.toUpperCase(), left + 4, line + 4);
    doc.setFont(this._font, 'normal');
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
    return this.addColumnHeader(doc, PdfPageSettings.MIDPAGE, line, ht);
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

  addLocationSection(
    doc: jsPDF,
    gear: Cp2020PlayerGearList,
    location: string,
    left: number,
    line: number,
    ht: number): number {
    if(location && location !== '') {
      line = this.addLocationHeader(location, doc, left, line, ht);
    }
    line = this.addRowHeader(doc, left, line, ht);
    const items = gear.items.filter(item => item.location.toLowerCase() === location.toLowerCase());

    const count = Math.ceil(items.length / 2);
    for (let i = 0; i < count; i++) {
      line = this.addGearRow(doc, items, i, i + count, left, line, ht);
    }
    return line;
  }

  addGearRow(
    doc: jsPDF,
    items: Array<Cp2020PlayerGear>,
    indexOne: number,
    indexTwo: number,
    left: number,
    line: number,
    ht: number
  ): number {
    // determine how tall the cell is and apply new page if needed.
    const gearOneName: Array<string> = doc.splitTextToSize(
      items[indexOne].gear ?? '',
      78
    );
    const gearTwoName: Array<string> = doc.splitTextToSize(
      items[indexTwo]?.gear ?? '',
      78
    );

    let cellHt = gearOneName.length * ht;
    cellHt =
      gearTwoName.length * ht > cellHt ? gearTwoName.length * ht : cellHt;

    if (line + cellHt > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = this.addRowHeader(doc, left, PdfPageSettings.MARGIN_TOP, ht);
    }

    let gearCost = items[indexOne]?.cost?.toString() ?? '';
    let gearWt = items[indexOne]?.weight?.toString() ?? '';
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

    gearCost = items[indexTwo]?.cost?.toString() ?? '';
    gearWt = items[indexTwo]?.weight?.toString() ?? '';

    this.addGearCell(
      doc,
      gearTwoName ?? [],
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
    let txtLine = line;
    gearName.forEach((name) => {
      doc.text(name, left + 1, txtLine + 4);
      txtLine += PdfPageSettings.LINEHEIGHT;
    });
    doc.text(cost, left + 81, line + 4);
    doc.text(wt, left + 91, line + 4);
    return cellHt;
  }
}
