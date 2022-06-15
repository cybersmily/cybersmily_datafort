import { PdfGeneratorService } from './../../../../services/pdf-services/pdf-generator.service';
import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
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
    pdfDoc.setFontSize(PdfPageSettings.FONT_SIZE_XL);
    pdfDoc.text(
      'CLUBS FOR CYBERPUNK 2020 OR CYBERPUNK RED',
      PdfPageSettings.MIDPAGE,
      line,
      {
        align: 'center',
      }
    );
    pdfDoc.setFontSize(PdfPageSettings.FONT_SIZE);
    return line + PdfPageSettings.LINEHEIGHT_XL;
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
      summary.length * PdfPageSettings.LINEHEIGHT +
      PdfPageSettings.LINEHEIGHT_XL;
    if (line + tempLine > PdfPageSettings.PAGE_HEIGHT) {
      pdfDoc.addPage();
      line = PdfPageSettings.MARGIN_TOP + 5;
    }
    pdfDoc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    pdfDoc.setFontSize(PdfPageSettings.FONT_SIZE_LG);
    pdfDoc.text(
      club.name.toUpperCase(),
      PdfPageSettings.MARGIN_LEFT + 5,
      line,
      {
        align: 'left',
      }
    );
    pdfDoc.setFontSize(PdfPageSettings.FONT_SIZE);
    pdfDoc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += PdfPageSettings.LINEHEIGHT_LG;
    summary.forEach((txt) => {
      pdfDoc.text(txt, PdfPageSettings.MARGIN_LEFT + 10, line, {
        align: 'left',
      });

      line += PdfPageSettings.LINEHEIGHT;
    });
    line += PdfPageSettings.LINEHEIGHT_LG;
    return line;
  }
}
