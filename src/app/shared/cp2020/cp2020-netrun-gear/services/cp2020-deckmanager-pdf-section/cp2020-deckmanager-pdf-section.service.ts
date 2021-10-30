import { Cp2020Program } from './../../models/cp2020-program';
import { Cp2020CyberdeckManager, Cp2020Cyberdeck, Cp2020ProgramList } from './../../models';
import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020DeckmanagerPdfSectionService {

  private _font = PdfPageSettings.DEFAULT_FONT.toString();
  private _left = PdfPageSettings.MARGIN_LEFT.valueOf();
  private _optionWidth = 35;

  constructor() { }

  createCp2020CyberdeckProgramsSection(doc:jsPDF, deckManager: Cp2020CyberdeckManager, font: string, leftMargin: number, line: number): number {
    this._font = font;
    this._left = leftMargin;
    line += 2;
    line = this.updateLine(doc, line, 20);
    // create section title
    line = this.addSectionTitle(doc, line);
    // create cyberdeck section
    line = this.addCyberdeckSection(doc, deckManager.deck, line);
    // create programs section
    line = this.addProgramsSection(doc, deckManager.programList, line);
    return line +7;
  }

  private addSectionTitle(doc: jsPDF, line: number): number {
    doc.setFontSize(11);
    doc.setFillColor('black');
    doc.rect(this._left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('CYBERDECK AND PROGRAMS', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(7);
    return line + 7;
  }

  private addCyberdeckSection(doc: jsPDF, deck: Cp2020Cyberdeck, line: number): number {
    line = this.updateLine(doc, line, 17);
    const start = line;
    line = this.addCyberdeckSectionTitle(doc, line);
    line = this.addCyberdeckDetails(doc, deck, line);
    doc.rect(this._left, start, 200, line - start, 'S');
    return line;
  }

  private addCyberdeckSectionTitle(doc: jsPDF, line: number): number {
    doc.setFontSize(11);
    doc.setFillColor('black');
    doc.rect(this._left, line, PdfPageSettings.MIDPAGE.valueOf(), 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('CYBERDECK', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(9);
    return line + 7;
  }

  private addCyberdeckDetails(doc: jsPDF, deck: Cp2020Cyberdeck, line: number): number {
    const width = PdfPageSettings.PAGE_WIDTH - 10;
    const name = `${deck.name} (${deck.type.name})`;
    const lineHt = 5;
    line += lineHt;
    doc.setFontSize(11);
    doc.text(name, this._left + 2, line);
    doc.text(`Cost: ${deck.cost.toLocaleString()}eb/${deck.bookPrice.toLocaleString()}eb(book)`, width, line, {align: 'right'});
    doc.setFontSize(9);
    line += lineHt;
    const attributes = `SPD: ${deck.speed}    Data Wall: ${deck.dataWall}    MU: ${deck.totalMU}`;
    doc.text(attributes, this._left + 2, line);
    line += lineHt;
    const options = `Options: ${deck.options.map(opt => opt.name).join(', ')}`;
    const optText = doc.splitTextToSize(options, width);
    optText.forEach(text => {
      doc.text(text, this._left + 2, line);
      line += lineHt;
    });

    const description = doc.splitTextToSize(`Description: ${deck.description}`, width);
    description.forEach( desc => {
      doc.text(desc, this._left + 2, line);
      line += lineHt;
    });
    return line;
  }

  private addProgramsSection(doc: jsPDF, programs: Cp2020ProgramList, line: number): number {
    line = this.updateLine(doc, line, 17);
    line = this.addProgramsSectionTitle(doc, line);
    // add programs
    programs.programs.forEach( program => {
      line = this.addProgramRow(doc, line, program);
      line = this.updateLine(doc, line , 17);
    });
    return line;
  }

  private addProgramsSectionTitle(doc: jsPDF, line: number): number {
    doc.setFontSize(11);
    doc.setFillColor('black');
    doc.rect(this._left, line, PdfPageSettings.MIDPAGE.valueOf(), 7, 'DF');
    doc.rect(this._left, line, 200, 7, 'S');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('PROGRAMS', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(9);
    return line + 7;
  }

  private addProgramRow(doc: jsPDF, line: number, program:Cp2020Program): number {
    const width = PdfPageSettings.PAGE_WIDTH - 10;
    const name = `${program.name} (${program.class.name})  STR: ${program.strength} MU: ${program.mu}`;
    const lineHt = 5;
    const start = line;
    line += lineHt;
    doc.setFontSize(11);
    doc.text(name, this._left + 2, line);
    let cost = `Cost: ${program.cost.toLocaleString()}eb`;
    cost += program?.bookCost ? `/${program.bookCost.toLocaleString()}eb(book)` : '';
    doc.text(cost, width, line, {align: 'right'});
    doc.setFontSize(9);
    line += lineHt;
    const options = `Options: ${program.options.map(opt => opt.name).join(', ')}`;
    const optText = doc.splitTextToSize(options, width);
    optText.forEach(text => {
      doc.text(text, this._left + 2, line);
      line += lineHt;
    });

    const description = doc.splitTextToSize(`Description: ${program.description}`, width);
    description.forEach( desc => {
      doc.text(desc, this._left + 2, line);
      line += lineHt;
    });
    doc.rect(this._left, start, 200, line - start, 'S');
    return line;
  }

  private updateLine(doc: jsPDF, line: number, ht: number): number {
    if( (line + ht ) > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      return PdfPageSettings.MARGIN_TOP;
    }
    return line;
  }
}
