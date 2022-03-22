import { CmbtZonePath } from './../cmbtzone/cmbt-zone-block';
import { jsPDF } from 'jspdf';
import 'svg2pdf.js'
import { Coord } from './../coord';
import { CmbtZoneBlock } from '../cmbtzone/cmbt-zone-block';
import { Canvg } from 'canvg';

export class CmbtZoneToPDF {
  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = 280;
  private _font = 'Arial';
  private _blockLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private _ratio = 4;

  generatePdf(
    blocks: Array<Coord>,
    streetBlocks: Array<CmbtZoneBlock>,
    blocksDescriptions: Array<Array<string>>,
    svg?: any
  ) {
    console.log(svg);
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);

    doc.svg(svg, {x: 5, y: 5, width:200, height:260})
    .then(() => {
      this.createSecondPage(doc, blocksDescriptions);
      doc.save('CombatZone.pdf');
     })
    .catch((err) => console.log(err));
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

  getPathArray(
    path: CmbtZonePath,
    blockCoord: Coord
  ): Array<{ op: string; c: Array<any> }> {
    const result = new Array<any>();
    let x = 0;
    let y = 0;
    x = Math.floor((path.x + blockCoord.x) / this._ratio);
    y = Math.floor((path.y + blockCoord.y) / this._ratio);
    result.push({ op: 'm', c: [x, y] });
    // parse the path ex: "h 200 v 90 h -110 v 110 h -90",
    const parsed = path.d.split(' ');
    let i = 0;
    while (i < parsed.length) {
      if (parsed[i] === 'h') {
        i++;
        x = x + this.getCoordValue(parsed[i]);
        i++;
      } else if (parsed[i] === 'v') {
        i++;
        y = y + this.getCoordValue(parsed[i]);
        i++;
      } else if (parsed[i] === 'l') {
        i++;
        x = x + this.getCoordValue(parsed[i]);
        i++;
        y = y + this.getCoordValue(parsed[i]);
        i++;
      } else {
        i++;
      }
      result.push({ op: 'l', c: [x, y] });
    }
    result.push({ op: 'l', c: [result[0].c[0], result[0].c[1]] });
    result.push({ op: 'h', c: [] });
    return result;
  }

  getCoordValue(value: string): number {
    const num = Number(value) / this._ratio;
    return num > 0 ? Math.floor(num) : Math.ceil(num);
  }

  createSecondPage(doc: jsPDF, blockDetails: Array<Array<string>>) {
    doc.addPage();
    let line = 20;
    blockDetails.forEach((b, i) => {
      doc.setFontSize(25);
      doc.text(`BLOCK ${i + 1}`, this._left, line);
      doc.setFontSize(this._fontSize);
      line = this.startNewPage(doc, line + 3);
      b.forEach((desc, j) => {
        const description: Array<string>
          = doc.splitTextToSize(`${this._blockLabels[j]} - ${desc}`, 180);
        description.forEach( txt => {
          doc.text(txt, this._left + 5, line);
          line = this.startNewPage(doc, line);
        });
      });
      line = this.startNewPage(doc, line + 10);
    });
  }

  startNewPage(doc: jsPDF, line: number): number {
    if (line > this._pageHeight) {
      doc.addPage();
      return 20;
    }
    return line + this._lineheight;
  }
}
