import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { jsPDF } from 'jspdf';
import { CpGang } from './../../models/cp-gang';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GangPdfService {
  constructor() {}

  savePDF(gangs: Array<CpGang>): void {
    const pdf = new jsPDF();
    let line = PdfPageSettings.MARGIN_TOP.valueOf();
    gangs.forEach((gang) => {
      line = this.addGangEntry(gang, pdf, line);
      return line + PdfPageSettings.LINEHEIGHT.valueOf();
    });
    pdf.save('Cyberpunk_Gang_List');
  }

  private addGangEntry(gang: CpGang, pdf: jsPDF, line: number): number {
    pdf.setFont(undefined, 'bold');
    pdf.text(
      gang.name.toUpperCase(),
      PdfPageSettings.MARGIN_LEFT.valueOf(),
      line
    );
    pdf.setFont(undefined, 'normal');
    line += PdfPageSettings.LINEHEIGHT.valueOf();

    const text = `A ${gang.member} ${gang.type}. The gang has been around for ${gang.age} with the average member's age being ${gang.memberAge}. The gang controls ${gang.turf} with ${gang.expansion}.`;
    const paragraph = pdf.splitTextToSize(text, 200);

    paragraph.forEach((textLine) => {
      pdf.text(textLine, PdfPageSettings.MARGIN_LEFT.valueOf(), line);
      line += PdfPageSettings.LINEHEIGHT.valueOf();
    });

    return line + PdfPageSettings.LINEHEIGHT.valueOf();
  }
}
