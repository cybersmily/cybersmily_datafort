import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CPRedNetArchNode } from './net-arch-node';
import { jsPDF } from 'jspdf';

export class CPRedNetArchPdf {
  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = 280;
  private _font = 'Arial';
  private _blockLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private _ratio = 4;
  private _plus = faPlus;

  generatePdf(
    architect: CPRedNetArchNode
  ) {
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);
    let svg = '<svg><g color="black">';
    svg += '<path fill="currentcolor" d="';
    svg += 'M41 20H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z';
    svg += '"></path>';
    svg += '</g></svg>';
    //const body = document.body;
    doc.html(svg, {
      callback: (doc) => {
        doc.save();
      },
      x: 10,
      y: 10
    });

    // this.createFirstPage(doc, architect);
    // this.createSecondPage(doc, blocksDescriptions);
    // doc.save('CPRed_NetArchitecture.pdf');
  }

  setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm',
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


  createFirstPage(
    doc: jsPDF,
    node: CPRedNetArchNode
  ) {
    doc.setFillColor('black');
    doc.setTextColor('black');
    let svg = '<svg><g color="black">';
    svg += '<path fill="currentcolor" d="';
    svg += 'M41 20H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z';
    svg += '"></path>';
    svg += '</g></svg>';
    doc.addSvgAsImage(svg, 200, 200, 200, 200);
  }

}
