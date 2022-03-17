import { NightMarketListing } from './night-market-listing';
import { jsPDF } from 'jspdf';

export class MarketsToPDF {
  private static _left = 5;
  private static _top = 10;
  private static _midPage = 140;
  private static _fontSize = 11;
  private static _font = 'Arial';

  static createNighMarketPDF(results: Array<NightMarketListing>) {
    const doc: jsPDF = this.setupDoc();
    let col = this._left;
    let line = this._top;
    doc.setFillColor('red');
    doc.setTextColor('white');
    const ht = 205;
    doc.roundedRect(15, 3, 254, ht, 3, 3, 'F');
    doc.setFont(this._font, 'bold');
    doc.setFontSize(15);
    doc.text('NIGHT MARKETS', this._midPage, line, { align: 'center' });
    doc.setFontSize(this._fontSize);
    line += 4;
    doc.setTextColor('black');
    doc.setFillColor('white');
    this.drawListings(doc, results, col + 25, line);
    doc.save('CP_NightMarket.pdf');
  }

  private static setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'l', // landscape
      format: 'a4',
      unit: 'mm'
    });
    // verify that Arial is a font.
    this._font = this.getFont(doc.getFontList());
    doc.setFont(this._font);
    doc.setFontSize(this._fontSize);
    return doc;
  }

  private static getFont(fonts: any): string {
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

  private static drawListings(doc: jsPDF, listings: Array<NightMarketListing>, left: number, line: number) {
    let currLine = line;
    listings.forEach( list => {
      const center = left + 55;
      doc.setFillColor('white');
      doc.roundedRect(left, currLine, 110, 180, 3, 3, 'F');
      currLine += 7;
      doc.setTextColor('black');
      doc.setFont(this._font, 'bold');
      doc.setFontSize(14);
      doc.text(list.category, center , currLine, {align: 'center'});
      currLine += 7;

      doc.setFont(this._font, 'normal');
      doc.setFontSize(10);
      list.items.forEach( item => {
        doc.text(item, center, currLine, {align: 'center'});
        currLine += 6;
      });

      left += 115;
      currLine = line;
    });
  }
}
