import { PdfGeneratorService } from './../../../../services/pdf-services/pdf-generator.service';
import { PdfPageSettings, PdfLineHeight, PdfFontSize } from './../../../../enums/pdf-page-settings';
import { Cp2020PlayerCyberList, Cp2020PlayerCyber } from './../../models';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020CyberwarePdfService {
  constructor() {}

  addCyberwareSection(
    doc: jsPDF,
    cyberware: Cp2020PlayerCyberList,
    left: number,
    line: number,
    ht: number
  ): number {
    // add spacer
    line += PdfLineHeight.DEFAULT;

    if (line + PdfLineHeight.DEFAULT * 4 > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    return this.addCyberware(doc, cyberware, left, line);
  }

  private addCyberware(
    doc: jsPDF,
    cyber: Cp2020PlayerCyberList,
    left: number,
    line: number
  ): number {
    line = this.addCyberSectionHeader(doc, left, line);
    line = this.addCyberHeaderRow(doc, left, line);

    const count = Math.ceil(cyber.items.length / 2);
    for (let i = 0; i < count; i++) {
      line = this.addCyberRow(doc, cyber.items, i, i + count, line, left);
    }

    // footer
    return this.addFooter(doc, cyber, left, line);
  }

  private addCyberSectionHeader(
    doc: jsPDF,
    left: number,
    line: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text('CYBERNETICS', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 7;
    doc.setFontSize(8);
    return line;
  }

  private addCyberHeaderRow(doc: jsPDF, left: number, line: number): number {
    this.addCyberHeaderCells(doc, left, line, PdfLineHeight.DEFAULT);
    this.addCyberHeaderCells(
      doc,
      PdfPageSettings.MIDPAGE,
      line,
      PdfLineHeight.DEFAULT
    );
    return line + PdfLineHeight.DEFAULT;
  }

  private addCyberHeaderCells(
    doc: jsPDF,
    left: number,
    line: number,
    ht: number
  ): void {
    doc.rect(left, line, 80, ht, 'S');
    doc.rect(left + 80, line, 10, ht, 'S');
    doc.rect(left + 90, line, 10, ht, 'S');
    doc.text('Type', left + 2, line + 4);
    doc.text('HL', left + 81, line + 4);
    doc.text('Cost', left + 91, line + 4);
  }

  private addCyberRow(
    doc: jsPDF,
    cyber: Array<Cp2020PlayerCyber>,
    indexOne: number,
    indexTwo: number,
    line: number,
    left: number
  ): number {
    const cyberOne: Array<string> = doc.splitTextToSize(
      cyber[indexOne]?.toString(),
      78
    );
    const cyberTwo: Array<string> = doc.splitTextToSize(
      cyber[indexTwo]?.toString() ?? '',
      78
    );
    let cellHt = cyberOne.length * PdfLineHeight.DEFAULT;
    cellHt =
      cellHt > cyberTwo.length * PdfLineHeight.DEFAULT
        ? cellHt
        : cyberTwo.length * PdfLineHeight.DEFAULT;

    if (line + cellHt > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = this.addCyberHeaderRow(doc, left, PdfPageSettings.MARGIN_TOP);
    }

    this.addCyberCell(
      doc,
      cyberOne,
      cyber[indexOne]?.totalHL?.toString() ?? '',
      cyber[indexOne]?.totalCost?.toString() ?? '',
      cellHt,
      line,
      left
    );
    if (cyberTwo) {
      this.addCyberCell(
        doc,
        cyberTwo ?? [],
        cyber[indexTwo]?.totalHL?.toString() ?? '',
        cyber[indexTwo]?.totalCost?.toString() ?? '',
        cellHt,
        line,
        PdfPageSettings.MIDPAGE
      );
    }

    return line + cellHt;
  }

  private addCyberCell(
    doc: jsPDF,
    cyber: Array<string>,
    hl: string,
    cost: string,
    cellHt: number,
    line: number,
    left: number
  ): void {
    const rectLine = line;
    cyber.forEach((txt) => {
      doc.text(txt ?? '', left + 2, line + 4);
      line += PdfLineHeight.DEFAULT;
    });
    doc.rect(left, rectLine, 80, cellHt, 'S');
    doc.rect(left + 80, rectLine, 10, cellHt, 'S');
    doc.rect(left + 90, rectLine, 10, cellHt, 'S');
    doc.text(hl, left + 81, rectLine + 4);
    doc.text(cost, left + 91, rectLine + 4);
  }

  private addFooter(
    doc: jsPDF,
    cyber: Cp2020PlayerCyberList,
    left: number,
    line: number
  ): number {
    doc.rect(
      left,
      line,
      PdfPageSettings.MIDPAGE + 75,
      PdfLineHeight.DEFAULT,
      'S'
    );
    doc.rect(
      PdfPageSettings.MIDPAGE + 80,
      line,
      10,
      PdfLineHeight.DEFAULT,
      'S'
    );
    doc.rect(
      PdfPageSettings.MIDPAGE + 90,
      line,
      10,
      PdfLineHeight.DEFAULT,
      'S'
    );
    doc.text('Total HL and Cost', left + 2, line + 4);
    doc.text(
      cyber.totalHL ? cyber?.totalHL?.toString() : '',
      PdfPageSettings.MIDPAGE + 81,
      line + 4
    );
    doc.text(
      cyber.totalCost ? cyber?.totalCost?.toLocaleString('en') : '',
      PdfPageSettings.MIDPAGE + 91,
      line + 4
    );
    return line + PdfLineHeight.DEFAULT + PdfLineHeight.DEFAULT;
  }
}
