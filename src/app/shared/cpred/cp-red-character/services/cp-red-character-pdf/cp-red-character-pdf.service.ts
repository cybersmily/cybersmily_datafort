import { CpRedSkillsPdfService } from './../../../cp-red-skills/services/cp-red-skills-pdf/cp-red-skills-pdf.service';
import { Coord } from './../../../../models/coord';
import { CPRedCharacterSheet } from './../../../models/cp-red-character-sheet';
import { CpRedStatsPdfService } from './../../../c-p-red-stats/services/cp-red-stats-pdf/cp-red-stats-pdf.service';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpRedCharacterPdfService {
  private _pdf: jsPDF = new jsPDF();

  private _left = 5;
  private _top = 2;
  private _lineheight = 7;
  private _midPage = 145;
  private _pageWidth = 290;
  private _fontSize = 11;
  private _pageHeight = 200;
  private _font = '';

  constructor(
    private statsPDF: CpRedStatsPdfService,
    private skillsPDF: CpRedSkillsPdfService
  ) {}

  savePDF(sheet: CPRedCharacterSheet): void {
    const character = sheet.character;
    this.setupDoc();
    this.addCharImage(this._pdf, character.image, 5, 5, 55);
    this.addHandle(character.handle, this._pdf, 5, 60, 56, 10);
    this.statsPDF.drawStatSection(character.stats, this._pdf, 64, 5, 14);
    this.skillsPDF.drawSkillSection(
      character.skills,
      character.stats,
      this._pdf,
      80,
      5,
      215,
      140,
      3.75,
      6.5
    );
    this._pdf.save('CPR-Character');
  }

  private addCharImage(
    pdf: jsPDF,
    img: string,
    left: number,
    line: number,
    imgSize: number
  ): void {
    // set the width to the ratio of the image hxw
    if (img) {
      const props = pdf.getImageProperties(img);
      const ratio = props.width / props.height;
      let width = ratio * imgSize;
      // set max width
      width = width > imgSize ? imgSize : width;
      // center the image
      let x = left + imgSize / 2;
      x -= width / 2;
      pdf.addImage(img, 'JPEG', x + 1, line + 1, width, imgSize);
    }
    pdf.setDrawColor('red');
    pdf.setFillColor('red');
    pdf.rect(left, line, imgSize + 1, 2, 'DF');
    pdf.rect(left, line, 1, imgSize + 1, 'DF');
    pdf.rect(left + imgSize, line, 1, imgSize + 1, 'DF');
    pdf.rect(left, line + imgSize, 1 + imgSize, 1, 'DF');
    pdf.triangle(left, line + 6, left, line + 2, left + 6, line + 2, 'DF');
  }

  private addHandle(
    handle: string,
    pdf: jsPDF,
    left: number,
    line: number,
    width: number,
    height: number
  ): void {
    pdf.setFillColor('white');
    pdf.setDrawColor('red');
    pdf.rect(left, line, width, height, 'S');
    pdf.setTextColor('gray');
    pdf.setFontSize(height / 2);
    pdf.text('Handle', left + 1, line + 3, {
      align: 'left',
      baseline: 'middle',
      maxWidth: width - 4,
    });
    pdf.setTextColor('black');
    pdf.setFontSize(height + 2);
    line += height / 2;
    pdf.text(handle, left + 2, line + 2, {
      align: 'left',
      baseline: 'middle',
      maxWidth: width - 4,
    });
  }

  private setupDoc(): void {
    this._pdf = new jsPDF({
      orientation: 'l',
      format: 'a4',
      unit: 'mm',
    });
    // verify that Arial is a font.
    this._font = this.getFont(this._pdf.getFontList());
    this._pdf.setFont(this._font);
    this._pdf.setFontSize(this._fontSize);
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
