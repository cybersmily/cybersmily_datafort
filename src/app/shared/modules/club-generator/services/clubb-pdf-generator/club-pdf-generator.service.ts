import { PdfGeneratorService } from './../../../../services/pdf-services/pdf-generator.service';
import { PdfPageSettings, PdfLineHeight, PdfFontSize } from './../../../../enums/pdf-page-settings';
import { PdfPageOrientation } from './../../../../enums/pdf-page-orientation';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { Club } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ClubPdfGeneratorService {
  constructor(private pdfGeneratorService: PdfGeneratorService) {}

  generate(clubs: Array<Club>): void {
    const pdfDoc = this.pdfGeneratorService.createDoc(
      PdfPageOrientation.PORTRAIT
    );
    let line = this.createTitle(pdfDoc);
    line = this.addClubs(pdfDoc, clubs, line);
    pdfDoc.save('Cyberpunk_Clubs.pdf');
  }

  createTitle(pdfDoc: jsPDF): number {
    let line = PdfPageSettings.MARGIN_TOP + 10;
    pdfDoc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    pdfDoc.setFontSize(PdfFontSize.XL);
    pdfDoc.text(
      'CLUBS FOR CYBERPUNK 2020 OR CYBERPUNK RED',
      PdfPageSettings.MIDPAGE,
      line,
      {
        align: 'center',
      }
    );
    pdfDoc.setFontSize(PdfFontSize.DEFAULT);
    return line + PdfLineHeight.XL;
  }

  addClubs(pdfDoc: jsPDF, clubs: Club[], line: number): number {
    clubs.forEach((club) => {
      line = this.addClub(pdfDoc, club, line);
    });
    return line;
  }

  addClub(pdfDoc: jsPDF, club: Club, line: number): number {
    const summary: Array<string> = pdfDoc.splitTextToSize(
      club.summary,
      PdfPageSettings.PAGE_WIDTH - 25
    );
    const tempLine =
      summary.length * PdfLineHeight.DEFAULT +
      PdfLineHeight.XL;
    if (line + tempLine > PdfPageSettings.PAGE_HEIGHT) {
      pdfDoc.addPage();
      line = PdfPageSettings.MARGIN_TOP + 5;
    }
    pdfDoc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    pdfDoc.setFontSize(PdfFontSize.LG);
    pdfDoc.text(
      club.name.toUpperCase(),
      PdfPageSettings.MARGIN_LEFT + 5,
      line,
      {
        align: 'left',
      }
    );
    pdfDoc.setFontSize(PdfFontSize.DEFAULT);
    pdfDoc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += PdfLineHeight.LG;
    summary.forEach((txt) => {
      pdfDoc.text(txt, PdfPageSettings.MARGIN_LEFT + 10, line, {
        align: 'left',
      });

      line += PdfLineHeight.DEFAULT;
    });
    line += PdfLineHeight.LG;
    return line;
  }
}
