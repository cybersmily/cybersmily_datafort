import { PdfPageSettings, PdfPageOrientation, PdfLineHeight, PdfFontSize } from './../../../../enums';
import { jsPDF } from 'jspdf';
import { Cp2020ArmorPiece } from './../../models';
import { PdfGeneratorService } from './../../../../services/pdf-services/pdf-generator.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClothingListPdfService {
  private _doc: jsPDF;
  private _title = 'Armor/Clothing List for Cyberpunk 2020';

  constructor(private PdfGeneratorService: PdfGeneratorService) { }

  saveToPDF(clothingList: Array<Cp2020ArmorPiece>, fileName: string) {
    this._doc = this.PdfGeneratorService.createDoc(PdfPageOrientation.PORTRAIT);
    let line: number = PdfPageSettings.MARGIN_TOP;
    // create the title of doc
    line = this.createTitle(line);
    line = this.createHeader(line);
    // loop through list and pring each item
    clothingList.forEach(armor => {
      line = this.addPieceToDoc(line, armor);

    });
    this.createFooterRow(line, clothingList);
    // save the PDF
    this._doc.save(fileName);
  }

  private createTitle(line: number): number {
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    this._doc.setFontSize(PdfFontSize.LG);
    this._doc.text(this._title, PdfPageSettings.MIDPAGE, line, {align: 'center'});
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 11;
    return line;
  }

  private createHeader(line: number): number {
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    this._doc.text('Name', PdfPageSettings.MARGIN_LEFT, line, {align: 'left'});
    this._doc.text('Cost', PdfPageSettings.MARGIN_RIGHT, line, {align: 'right'});
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 8;
    return line;

  }

  private addPieceToDoc(line: number, armor: Cp2020ArmorPiece): number {
    let text = `${armor.name}`;
    if (armor.baseSP > 0) {
      text += ` [SP:${armor.baseSP} (${armor.clothes.loc}) EV:${armor.ev}]`;
    }
    this._doc.text(text, PdfPageSettings.MARGIN_LEFT, line, {align: 'left'});
    this._doc.text(`${armor.cost.toLocaleString()}eb`, PdfPageSettings.MARGIN_RIGHT, line, {align: 'right'});
    if(armor.options.length > 0) {
      line += PdfLineHeight.SM;
      this._doc.setFontSize(PdfFontSize.SM);
      const options = armor.options.map(opt => opt.name).join(', ');
      this._doc.text(`options: ${options}`, PdfPageSettings.MARGIN_LEFT + 10, line, {align: 'left'});
      this._doc.setFontSize(PdfFontSize.DEFAULT);
    }
    if ((line + 10 ) > +PdfPageSettings.PAGE_HEIGHT) {
      this._doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    } else {
      line += PdfLineHeight.DEFAULT;
    }

    return line;
  }

  private createFooterRow(line: number, clothingList: Array<Cp2020ArmorPiece>): number {
    this._doc.line(PdfPageSettings.MIDPAGE, line, PdfPageSettings.MARGIN_RIGHT, line);
    line += PdfLineHeight.DEFAULT;
    const cost = clothingList.reduce((a,b) => a + b.cost, 0);
    const text = `Total Cost: ${cost.toLocaleString()}eb`;
    this._doc.text(text, PdfPageSettings.MARGIN_RIGHT, line, {align: 'right'});
    return line;
  }
}
