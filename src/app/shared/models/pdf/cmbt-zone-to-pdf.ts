import * as jsPDF from 'jspdf';
import Canvg from 'canvg';

export class CmbtZoneToPDF {

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = 290;
  private _font = 'Arial';

  generatePdf(svg: string, blocks: Array<Array<string>>) {
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);

    this.createFirstPage(doc, svg);

    const filename = 'Combat_Zone_Map';
    doc.save(`CP2020_${filename}.pdf`);
  }

  setupDoc(): jsPDF.jsPDF {
    const doc = new jsPDF.jsPDF({
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

  createFirstPage(doc: jsPDF.jsPDF, svg: string) {
    console.log(svg);
    doc.addSvgAsImage(svg, 2, 5, 210, this._pageHeight);
  }

  createSecondPage( doc: jsPDF.jsPDF) {
    doc.addPage();
    let line = this._top;
  }

}
