import { CPRedLifepathJumpStart } from './../../c-p-red-lifepath/models/cp-red-lifepath-js';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CPRedCharacterPDFService {

  constructor() { }

  private _character: any;

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 105;
  private _pageWidth = 200;
  private _fontSize = 11;
  private _pageHeight = 290;
  private _font = '';

  generatePdf(character: any) {
    this._character = character;
    const doc = this.setupDoc();
    this.createBackgroundBox(doc, 'FD', this._top, this._left, 100, 150, 10, 'red');
    const filename = 'test';
    doc.save(`CPRED_${filename}.pdf`);
  }


  generateLifePahtPDF(lifepath: CPRedLifepathJumpStart) {
    const doc = this.setupDoc();
    this.createLifePathFullPage(doc, lifepath);
    doc.save(`CPRED_LIFEPATH.pdf`);

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

  /**
   * This function will create a box in the style of CP Red, clipping the two corners.
   *
   * @private
   * @param {jsPDF} doc
   * @param {string} style - Fill style. Use 'FD' by default (fill then stroke). Also avaliable 'F' and 'S'
   * @param {number} top - the y coordiante to place the box
   * @param {number} left - the x coordinate to place the box
   * @param {number} height - height of the box
   * @param {number} width - width of the box
   * @param {number} triangleSide - the size of the clipping on corners.
   * @param {string} color - the color to fill the box, 'red'
   * @memberof CPRedCharacterPDFService
   */
  private createBackgroundBox(doc: jsPDF, style: string,
    top: number, left: number,
    height: number, width: number,
    triangleSide: number, color: string
  ) {
    width = (width > this._pageWidth) ? this._pageWidth : width;
    const acc = [];
    acc.push([0, 0]);
    acc.push([(width - triangleSide), 0]);
    acc.push([triangleSide, triangleSide]);
    acc.push([0, (height - triangleSide)]);
    acc.push([(triangleSide - width), 0]);
    acc.push([-triangleSide, -triangleSide]);

    doc.setFillColor(color);
    doc.setDrawColor(color);
    doc.lines(acc, left, top, [1, 1], style, true);
  }

  private createLifePathFullPage(doc: jsPDF, lifePath: CPRedLifepathJumpStart) {
    let line = this._top;
    let left = this._left;
    this.createBackgroundBox(doc, 'FD', line, left, this._pageHeight, this._pageWidth, 10, 'red');
    // Background
    line += 10;
    left += 5;
    line = this.createLifePathSection(doc, 'BACKGROUND', [lifePath.background], line, left, 50);
    // Motivation
    line = this.createLifePathSection(doc, 'MOTIVATION', [lifePath.motivation], line, left, 25);

    // Goals
    line = this.createLifePathSection(doc, 'GOALS', [lifePath.goals], line, left, 25);

    // Friends
    line = this.createLifePathSection(doc, 'FRIENDS', lifePath.friends, line, left, 50);

    // Enemies
    line = this.createLifePathSection(doc, 'ENEMIES', lifePath.enemies, line, left, 50);

    // Romance
    line = this.createLifePathSection(doc, 'ROMANCE', [lifePath.romance], line, left, 25);

    // Personality
    line = this.createLifePathSection(doc, 'PERSONALITY', [lifePath.personality], line, left, 25);
  }

  private createLifePathSection(doc: jsPDF, title: string, text: Array<string>, line: number, left: number, height: number): number {
    doc.setFont(this._font, 'bold');
    doc.setFontSize(this._fontSize);
    doc.setTextColor('white');
    doc.text(title, left, line + Math.floor(height / 2), {baseline: 'middle'});
    doc.setFillColor('white');
    doc.setFont(this._font, 'normal');
    doc.rect(left + 45, line, 140, height, 'F');
    doc.setTextColor('black');
    doc.setFontSize(this._fontSize - 1);
    let textLine = line + 3;
    const textLeft = left + 50;
    text.forEach( str => {
      const textArray: Array<string> = doc.splitTextToSize(str, 130);
      textArray.forEach( txt => {
        doc.text(txt, textLeft, textLine, {baseline: 'top'} );
        textLine += this._lineheight;
      });
    });
    doc.setFontSize(this._fontSize);
    return line + height + 3;
  }

}
