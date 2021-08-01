import { CPRedLifepathJumpStart } from './cp-red-lifepath-js';
import { jsPDF } from 'jspdf';
export class PDFCPRedLifePathJs {

  static creatdPDF(doc: jsPDF, lifepath: CPRedLifepathJumpStart, leftMargin: number, top: number, lineheight: number, pageHeight: number, pageWidth: number, font: string, fontsize: number ): jsPDF {
    this.createLifePathFullPage(doc, lifepath, leftMargin, top, lineheight, pageHeight, pageWidth, font, fontsize );
    return doc;
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
  private static createBackgroundBox(doc: jsPDF, style: string,
    top: number, left: number,
    height: number, width: number,
    triangleSide: number, color: string
  ) {
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

  private static createLifePathFullPage(doc: jsPDF, lifePath: CPRedLifepathJumpStart, leftMargin: number, top: number, lineheight: number, pageHeight: number, pageWidth: number, font: string, fontsize: number ) {
    let line = top;
    let left = leftMargin;
    this.createBackgroundBox(doc, 'FD', line, left, pageHeight, pageWidth, 10, 'red');
    // Background
    line += 10;
    left += 5;
    line = this.createLifePathSection(doc, 'BACKGROUND', [lifePath.background], line, lineheight, left, 50, font, fontsize);
    // Motivation
    line = this.createLifePathSection(doc, 'MOTIVATION', [lifePath.motivation], line, lineheight, left, 25, font, fontsize);

    // Goals
    line = this.createLifePathSection(doc, 'GOALS', [lifePath.goals], line, lineheight, left, 25, font, fontsize);

    // Friends
    line = this.createLifePathSection(doc, 'FRIENDS', lifePath.friends, line, lineheight, left, 50, font, fontsize);

    // Enemies
    line = this.createLifePathSection(doc, 'ENEMIES', lifePath.enemies, line, lineheight, left, 50, font, fontsize);

    // Romance
    line = this.createLifePathSection(doc, 'ROMANCE', [lifePath.romance], line, lineheight, left, 25, font, fontsize);

    // Personality
    line = this.createLifePathSection(doc, 'PERSONALITY', [lifePath.personality], line, lineheight, left, 25, font, fontsize);
  }

  private static createLifePathSection(doc: jsPDF, title: string, text: Array<string>, line: number, lineHeight: number, left: number, height: number, font: string,fontSize: number): number {
    doc.setFont(font, 'bold');
    doc.setFontSize(fontSize);
    doc.setTextColor('white');
    doc.text(title, left, line + Math.floor(height / 2), {baseline: 'middle'});
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.rect(left + 45, line, 140, height, 'F');
    doc.setTextColor('black');
    doc.setFontSize(fontSize - 1);
    let textLine = line + 3;
    const textLeft = left + 50;
    text.forEach( str => {
      const textArray: Array<string> = doc.splitTextToSize(str, 130);
      textArray.forEach( txt => {
        doc.text(txt, textLeft, textLine, {baseline: 'top'} );
        textLine += lineHeight;
      });
    });
    doc.setFontSize(fontSize);
    return line + height + 3;
  }
}
