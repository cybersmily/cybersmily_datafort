import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import {
  BigLeagueContact,
  Cp2020PlayerContact,
  Cp2020PlayerContacts,
  HotStuffArea,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ContactSectionPdfService {
  private _font = PdfPageSettings.DEFAULT_FONT.valueOf();
  private _left = PdfPageSettings.MARGIN_LEFT.valueOf();
  private _optionWidth = 35;

  constructor() {}

  generatePDF(
    doc: jsPDF,
    contacts: Cp2020PlayerContacts,
    line: number
  ): number {
    line = this.generateHeader(doc, line);
    line = this.generateBigLeague(doc, line, contacts.bigLeague);
    line = this.generateHotStuff(doc, line, contacts.hotStuff);
    line = this.generateOther(doc, line, contacts.other);
    return line;
  }

  private generateHeader(doc: jsPDF, line: number): number {
    if (line + 20 > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
    }
    doc.setFillColor('black');
    doc.rect(this._left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('CONTACTS', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(7);
    return line + 7;
  }

  private generateBigLeague(
    doc: jsPDF,
    line: number,
    contacts: Array<BigLeagueContact>
  ): number {
    line = this.generateBigLeagueHeader(doc, line);
    contacts.forEach((contact) => {
      line = this.generateBigLeagueContact(doc, line, contact);
    });
    return line;
  }

  private generateBigLeagueHeader(doc: jsPDF, line: number): number {
    if (line + 20 > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    doc.setFillColor('black');
    doc.rect(this._left, line, 50, 7, 'DF');
    doc.rect(this._left, line, 200, 7, 'S');

    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('BIG LEAGUE CONTACTS', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(9);
    return line + 7;
  }

  private generateBigLeagueContact(
    doc: jsPDF,
    line: number,
    contact: BigLeagueContact
  ): number {
    let desc: Array<string> = contact.details
      ? doc.splitTextToSize(contact.details, 180)
      : [];
    const ht = (desc.length + 1) * 6;

    if (ht + line > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    doc.rect(this._left, line, 200, ht, 'S');
    doc.text(`${contact.name || 'contact'}`, this._left + 2, line + 5);
    doc.text(`${contact.capability.name}`, this._left + 50, line + 5);
    doc.text(`${contact.reputation.name}`, this._left + 70, line + 5);
    doc.text(`${contact.availability.name}`, this._left + 80, line + 5);
    doc.text(`${contact.reliability.name}`, this._left + 100, line + 5);
    doc.text(`${contact.cost}pts`, this._left + 120, line + 5);
    if (desc.length > 0) {
      desc.forEach((str) => {
        line += 6;
        doc.text(`${str}`, this._left + 6, line + 5);
      });
    }

    return line + 6;
  }

  private generateHotStuff(
    doc: jsPDF,
    line: number,
    contacts: Array<HotStuffArea>
  ): number {
    line = this.generateHotStuffHeader(doc, line);
    contacts.forEach((contact) => {
      line = this.generateHotStuffArea(doc, line, contact);
    });
    return line;
  }

  private generateHotStuffHeader(doc: jsPDF, line: number): number {
    if (line + 20 > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    doc.setFillColor('black');
    doc.rect(this._left, line, 50, 7, 'DF');
    doc.rect(this._left, line, 200, 7, 'S');

    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HOT STUFF CONTACTS', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(9);
    return line + 7;
  }

  private generateHotStuffArea(
    doc: jsPDF,
    line: number,
    contact: HotStuffArea
  ): number {
    let desc: Array<string> = contact.details
      ? doc.splitTextToSize(contact.details, 180)
      : [];
    const ht = (desc.length + 1) * 6;

    if (ht + line > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    doc.rect(this._left, line, 200, ht, 'S');
    doc.text(`${contact.area || 'contact'}`, this._left + 2, line + 5);
    doc.text(`${contact.rolls.toString()} Rolls`, this._left + 50, line + 5);
    doc.text(`${contact.points}pts`, this._left + 65, line + 5);
    if (desc.length > 0) {
      desc.forEach((str) => {
        line += 6;
        doc.text(`${str}`, this._left + 6, line + 5);
      });
    }
    return line + 6;
  }

  private generateOther(
    doc: jsPDF,
    line: number,
    contacts: Array<Cp2020PlayerContact>
  ): number {
    line = this.generateOtherHeader(doc, line);
    contacts.forEach((contact) => {
      line = this.generateOtherContact(doc, line, contact);
    });
    return line;
  }

  private generateOtherHeader(doc: jsPDF, line: number): number {
    if (line + 20 > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    doc.setFillColor('black');
    doc.rect(this._left, line, 50, 7, 'DF');
    doc.rect(this._left, line, 200, 7, 'S');

    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('GENERIC CONTACTS', this._left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(9);
    return line + 7;
  }

  private generateOtherContact(
    doc: jsPDF,
    line: number,
    contact: Cp2020PlayerContact
  ): number {
    let desc: Array<string> = contact.notes
      ? doc.splitTextToSize(contact.notes, 180)
      : [];
    const ht = (desc.length + 2) * 6;

    if (ht + line > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP;
    }
    doc.rect(this._left, line, 200, ht, 'S');
    doc.text(`${contact.name || 'contact'}`, this._left + 2, line + 5);
    line += 6;
    doc.text(`description: ${contact.description}`, this._left + 2, line + 5);
    if (desc.length > 0) {
      desc.forEach((str) => {
        line += 6;
        doc.text(`${str}`, this._left + 6, line + 5);
      });
    }
    return line + 6;
  }
}
