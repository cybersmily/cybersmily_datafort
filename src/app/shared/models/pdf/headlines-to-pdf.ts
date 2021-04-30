import { jsPDF } from 'jspdf';

export class HeadlinesToPDF {
  private _left = 5;
  private _top = 15;
  private _midPage = 105;
  private _fontSize = 11;
  private _font = 'Arial';

   generatePdf( headlines: Array<string>) {
    const doc: jsPDF = this.setupDoc();
    let line = this._top;
    let nextLine = this._top;
    doc.setFont(this._font, 'bold');
    doc.setFontSize(15);
    doc.text('CYBERPUNK NEWS HEADLINES', this._midPage, line, {align: 'center'});
    doc.setFontSize(this._fontSize);
    line += 20;
    headlines.forEach( (d, i) => {
      line = this.addHeadline(doc, d, line);
      if ( line > 240 ) {
        line = this._top;
        doc.addPage();
      }
    });
    doc.save('CP_Headlines.pdf');
  }

  private setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    });
     // verify that Arial is a font.
     this._font = this.getFont(doc.getFontList());
    doc.setFont(this._font);
    doc.setFontSize(this._fontSize);
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

  private addHeadline(doc: jsPDF, headline: string, line: number): number {
    doc.setFont(this._font, 'bold');
    doc.text(headline, this._left, line);
    doc.setFont(this._font, 'normal');
    line += 7;
    return line;
  }
}
