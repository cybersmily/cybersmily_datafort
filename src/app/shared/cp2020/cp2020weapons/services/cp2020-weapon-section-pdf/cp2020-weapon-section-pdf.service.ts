import { PdfPageSettings, PdfLineHeight, PdfFontSize } from './../../../../enums/pdf-page-settings';
import { CpPlayerWeaponList, CpPlayerWeapon } from './../../models';
import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020WeaponSectionPdfService {
  private _font = PdfPageSettings.DEFAULT_FONT.toString();

  constructor() {}

  addWeaponSection(
    doc: jsPDF,
    weapons: CpPlayerWeaponList,
    font: string,
    left: number,
    line: number
  ): number {
    this._font = font;
    return this.addWeapons(doc, weapons, left, line);
  }


  private addWeapons(
    doc: jsPDF,
    weapons: CpPlayerWeaponList,
    left: number,
    line: number
  ): number {
    // added section header
    doc.setFillColor('black');
    doc.rect(left, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('WEAPONS', left + 2, line + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.setFontSize(7);
    const ht = 5;
    const leftMargin = left;
    line += 7;

    line = this.addWeaponColumnHeaders(doc, ht, left, line);

    // add each weapon to the list.
    weapons.items.forEach((w) => {
      line = this.addWeaponRow(doc, w, ht, left, line);
    });
    // add total cost
    doc.rect(left, line, 200, 7, 'S');
    doc.text(`TOTAL COST: ${weapons.totalCost.toLocaleString()}eb`, 199, line + 5,{align: 'right'});
    doc.setFontSize(PdfFontSize.DEFAULT);
    return line + 6;
  }

  private addWeaponColumnHeaders(
    doc: jsPDF,
    ht: number,
    left: number,
    line: number
  ): number {
    doc.setFont(this._font, 'bold');
    // header
    doc.rect(left, line, 30, ht, 'S');
    doc.text('Name', left + 1, line + 4);
    left += 30;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('Type', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('WA', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('Conc.', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 8, ht, 'S');
    doc.text('Avail.', left + 0.5, line + 4);
    left += 8;

    doc.rect(left, line, 12, ht, 'S');
    doc.text('Dam.', left + 0.5, line + 4);
    left += 12;

    doc.rect(left, line, 10, ht, 'S');
    doc.text('#Shots', left + 0.5, line + 4);
    left += 10;

    doc.rect(left, line, 9, ht, 'S');
    doc.text('ROF', left + 0.5, line + 4);
    left += 9;

    doc.rect(left, line, 7, ht, 'S');
    doc.text('Rel', left + 0.5, line + 4);
    left += 7;

    doc.rect(PdfPageSettings.MIDPAGE, line, 100, ht, 'S');
    doc.text('Notes', PdfPageSettings.MIDPAGE + 3, line + 4);
    doc.setFont(this._font, 'normal');
    left += 7;

    line += ht;
    return line;
  }

  private addWeaponRow(
    doc: jsPDF,
    weapon: CpPlayerWeapon,
    ht: number,
    left: number,
    line: number
  ): number {
    const rowHt = this.calculateWeaponRowHeight(doc, weapon);
    if (line + rowHt > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      line = this.addWeaponColumnHeaders(
        doc,
        ht,
        left,
        PdfPageSettings.MARGIN_TOP
      );
    }
    const startLine = line;
    left = PdfPageSettings.MARGIN_LEFT;
    const textLine = line + 3.5;
    const weaponName: Array<string> = doc.splitTextToSize(
      weapon?.name ?? '',
      28
    );
    const wpnHt = weaponName.length * PdfLineHeight.SM;
    doc.rect(left, line, 30, wpnHt, 'S');
    let nameLine = line + 3.5;
    weaponName.forEach((name) => {
      doc.text(name, left + 1, nameLine);
      nameLine += PdfLineHeight.SM;
    });

    left += 30;

    doc.rect(left, line, 8, wpnHt, 'S');
    doc.text(weapon.type ? weapon.type : '', left + 0.5, textLine);
    left += 8;

    doc.rect(left, line, 8, wpnHt, 'S');
    doc.text(weapon.wa ? weapon.wa.toString() : '', left + 0.5, textLine);
    left += 8;

    doc.rect(left, line, 8, wpnHt, 'S');
    doc.text(weapon.conc ? weapon.conc : '', left + 0.5, textLine);
    left += 8;

    doc.rect(left, line, 8, wpnHt, 'S');
    doc.text(weapon.avail ? weapon.avail : '', left + 0.5, textLine);
    left += 8;

    doc.rect(left, line, 12, wpnHt, 'S');
    doc.text(weapon.damage ? weapon.damage : '', left + 0.5, textLine);
    left += 12;

    doc.rect(left, line, 10, wpnHt, 'S');
    doc.text(weapon.shots ? weapon.shots.toString() : '', left + 0.5, textLine);
    left += 10;

    doc.rect(left, line, 9, wpnHt, 'S');
    doc.text(weapon.rof ? weapon.rof.toString() : '', left + 0.5, textLine);
    left += 9;

    doc.rect(left, line, 7, wpnHt, 'S');
    doc.text(weapon.rel ? weapon.rel : '', left + 0.5, textLine);
    left += 7;
    line += wpnHt;

    let shotsHt = 0;
    if (weapon.shots && weapon.shots > 1) {
      left = PdfPageSettings.MARGIN_LEFT + 5;
      for (let i = 0; i < weapon.shots; i++) {
        doc.rect(left, line + shotsHt + 1, 2, 2, 'S');
        left += 3;
        if ((i + 1) % 30 === 0) {
          left = PdfPageSettings.MARGIN_LEFT + 5;
          shotsHt += ht;
        }
      }
      shotsHt += ht;
      doc.rect(PdfPageSettings.MARGIN_LEFT, line, 100, shotsHt, 'S');
    }
    let noteHeight = 0;
    if (weapon.options && weapon.options.length > 0) {
      let noteLine = line + shotsHt + PdfLineHeight.DEFAULT - 2;
      let left = PdfPageSettings.MARGIN_LEFT + 5;
      const opts = weapon.options.map((o) => `${o.count} ${o.name}`).join(', ');
      const optText = doc.splitTextToSize(`Options: ${opts}`, 90);
      optText.forEach((txt) => {
        noteHeight += PdfLineHeight.DEFAULT;
        doc.text(txt, left, noteLine);
        noteLine += PdfLineHeight.DEFAULT - 2;
      });
      doc.rect(
        PdfPageSettings.MARGIN_LEFT,
        line + shotsHt,
        100,
        noteHeight,
        'S'
      );
    }

    let rectHt = ht;
    if ((weapon.notes && weapon.notes !== '') || weapon.thrown) {
      const text =
        (weapon.thrown ? 'Throweapon.. ' : '') +
        (weapon.notes ? weapon.notes : '');
      let notes = new Array<string>();
      notes = doc.splitTextToSize(text, 90);
      rectHt = ht;
      let noteLine = startLine;
      notes.forEach((txt) => {
        doc.text(txt, PdfPageSettings.MIDPAGE + 2, noteLine + 3.5);
        noteLine += ht;
        rectHt += ht;
      });
    }
    const adjHt =
      rectHt > shotsHt + noteHeight ? rectHt - ht : shotsHt + noteHeight;
    doc.rect(PdfPageSettings.MIDPAGE, startLine, 100, adjHt + ht, 'S');
    line += adjHt;
    return line;
  }

  private calculateWeaponRowHeight(doc: jsPDF, weapon: CpPlayerWeapon): number {
    let ht =
      doc.splitTextToSize(weapon.name, 28).length * PdfLineHeight.DEFAULT;
    if (weapon.shots && weapon.shots > 1) {
      ht += Math.ceil(weapon.shots / 30) * 7;
    }
    if (weapon.options && weapon.options.length > 0) {
      const opts = weapon.options.map((o) => `${o.count} ${o.name}`).join(', ');
      const optText: Array<string> = doc.splitTextToSize(
        `Options: ${opts}`,
        90
      );
      ht += optText?.length * 7;
    }

    let noteHt = 0;
    if ((weapon.notes && weapon.notes !== '') || weapon.thrown) {
      const text =
        (weapon.thrown ? 'Throweapon.. ' : '') +
        (weapon.notes ? weapon.notes : '');
      let notes: Array<string> = doc.splitTextToSize(text, 90);
      noteHt = notes.length * 7;
    }

    return ht > noteHt ? ht : noteHt;
  }
}
