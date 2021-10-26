import { PdfPageOrientation } from './../../enums/pdf-page-orientation';
import { PdfPageSettings } from './../../enums/pdf-page-settings';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {}

  createDoc(orientation: PdfPageOrientation): jsPDF {
    const doc = this.setupDoc(orientation);
    return doc;
  }

  private setupDoc(orientation: PdfPageOrientation): jsPDF {
    const doc = new jsPDF({
      orientation: orientation,
      format: 'a4',
      unit: 'mm',
    });
    // verify that Arial is a font.
     const font = this.getFont(doc.getFontList());
    doc.setFont(font);
    doc.setFontSize(PdfPageSettings.FONT_SIZE);
    return doc;
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

}
