import { Injectable } from '@angular/core';
import { iCrCzSquad } from '../../models/cr-cz-squad';
import { jsPDF } from 'jspdf';
import { PdfPageOrientation } from './../../../shared/enums';
import {
  PdfPageSettings,
  PdfLineHeight,
  PdfFontSize,
} from './../../../shared/enums/pdf-page-settings';
import { iCrCzUnitCard } from '../../models/cr-cz-unit-card';
import { iCrCzObjectiveCard } from '../../models/cr-cz-objective-card';

@Injectable({
  providedIn: 'root',
})
export class CrCzArmyPdfService {
  private _doc: jsPDF;

  constructor() {}

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

  generateCombatZoneArmyList(squad: iCrCzSquad, fileName: string): void {
    this._doc = new jsPDF({
      orientation: PdfPageOrientation.LANDSCAPE,
      format: 'a4',
      unit: 'mm',
    });
    // verify that Arial is a font.
    const font = this.getFont(this._doc.getFontList());
    this._doc.setFont(font);
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    let line: number = PdfPageSettings.MARGIN_TOP;
    // set the squad name
    line = this.createTitle(
      line,
      PdfPageSettings.MIDPAGE,
      `TEAM NAME: ${squad.name?.toUpperCase()}`
    );
    line = this.createTitle(
      line,
      PdfPageSettings.MIDPAGE,
      squad.faction?.toUpperCase()
    );
    const mercs = squad.units.filter(
      (unit) => unit.faction !== squad.faction && unit.isMerc
    );
    const gearCount = squad.units.reduce((a, b) => a + b.gearCards.length, 0);
    const leaders = squad.units.filter( unit => unit.isLeader);
    line = this.createSummaryRow(
      line,
      PdfPageSettings.MARGIN_LEFT,
      squad.totalCost,
      squad.totalStreetcred,
      squad.totalInfluence,
      squad.totalGonks,
      leaders.length,
      mercs.length,
      gearCount,
      squad.units.length
    );
    // list the units and their gear/programs
    line += 5;
    let secondColLine = this.createTitle(line, 220, 'ACHEIVED OBJECTIVES');
    squad.objectives.forEach((objective) => {
      secondColLine = this.createObjectivetRow(secondColLine, 180, objective);
    });

    line = this.createTitle(line, 80, 'TEAM MEMBERS');
    line = this.createUnitHeader(line, PdfPageSettings.MARGIN_LEFT);
    squad.units.forEach((unit) => {
      line = this.createUnitRow(
        line,
        PdfPageSettings.MARGIN_LEFT,
        unit,
        squad.faction
      );
    });
    // list objectives
    line += 5;
    this._doc.save(fileName);
  }

  private createTitle(line: number, leftMargin: number, title: string): number {
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    this._doc.setFontSize(PdfFontSize.LG);
    this._doc.text(title, leftMargin, line, { align: 'center' });
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 5;
    return line;
  }

  private createSummaryRow(
    line: number,
    leftMargin: number,
    totalEb: number,
    totalStreetcred: number,
    totalInfluence: number,
    totalGonks: number,
    totalLeaders: number,
    totalMercs: number,
    totalGear: number,
    totalUnits: number
  ): number {
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.text(`Total Units: ${totalUnits}`, leftMargin, line);
    this._doc.text(`Total EB: ${totalEb}`, leftMargin + 35, line);
    this._doc.text(
      `Total Streetcred: ${totalStreetcred}`,
      leftMargin + 60,
      line
    );
    this._doc.text(`Total Influence: ${totalInfluence}`, +100, line);
    this._doc.text(`Total Gonks: ${totalGonks}`, +135, line);
    this._doc.text(`Total Leaders: ${totalLeaders}`, +163, line);
    this._doc.text(`Total Mercs: ${totalMercs}`, +193, line);
    this._doc.text(`# Gear: ${totalGear}`, leftMargin + 215, line);
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 4;
    return line;
  }

  private createUnitHeader(line: number, leftMargin: number): number {
    this._doc.setFontSize(PdfFontSize.SM);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'italic');
    this._doc.text('Name', leftMargin, line);
    this._doc.text(`SC`, leftMargin + 92, line), {align: 'center'};
    this._doc.text(`EB`, leftMargin + 103, line, {align: 'center'});
    this._doc.text('Keywords', leftMargin + 110, line);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    line += 4;
    return line;

  }

  private createUnitRow(
    line: number,
    leftMargin: number,
    unit: iCrCzUnitCard,
    squadFaction: string
  ): number {
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    let unitName = unit.name?.toUpperCase();
    this._doc.text(unitName, leftMargin, line);
    if (unit.faction !== squadFaction) {
      this._doc.setFontSize(PdfFontSize.XS);
      this._doc.text(
        `** [MERC - ${unit.faction?.toUpperCase()}] **`,
        leftMargin + 5,
        line + 3
      );
      this._doc.setFontSize(PdfFontSize.DEFAULT);
    }
    this._doc.text(`${unit.streetcred}SC`, leftMargin + 90, line);
    this._doc.text(`${unit.ebCost.toString()}eb`, leftMargin + 107, line, {align: 'right'});
    this._doc.text(unit.keywords.join(', '), leftMargin + 110, line);
    line += 4;
    this._doc.setFontSize(PdfFontSize.SM);
    if (unit.gearCards.length > 0) {
      this._doc.text('Gear', leftMargin + 3, line);
      unit.gearCards.forEach((gear) => {
        this._doc.text(gear.name?.toUpperCase(), leftMargin + 12, line);
        this._doc.text(`${gear?.streetcred}SC`, leftMargin + 90, line);
        this._doc.text(`+${gear.ebCost}eb`, leftMargin + 107, line, {align: 'right'});
        this._doc.text(`${gear.rarity} rarity`, leftMargin + 110, line);
        line += 3;
      });
      line += 1;
    }
    if (unit.programs.length > 0) {
      this._doc.text('Hacks', leftMargin + 3, line);
      unit.programs.forEach((prog) => {
        this._doc.text(prog.name?.toUpperCase(), leftMargin + 12, line);
        this._doc.text(`${prog?.streetcred}SC`, leftMargin + 90, line);
        this._doc.text(`+${prog.ebCost}eb`, leftMargin + 107, line, {align: 'right'});
        this._doc.text(`${prog.rarity} rarity`, leftMargin + 110, line);
        line += 3;
      });
      line += 1;
    }
    this._doc.text(`Total Cost: `, leftMargin + 90, line, {align: 'right'});
    this._doc.text(`${unit.totalCost}eb`, leftMargin + 107, line, {align: 'right'});
    line += 1;
    this._doc.setLineWidth(0.5);
    this._doc.setDrawColor('#AAAAAA');
    this._doc.line(leftMargin, line, leftMargin + 160,  line );
    this._doc.setDrawColor('black');
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 4;
    return line;
  }

  private createObjectivetRow(
    line: number,
    leftMargin: number,
    objective: iCrCzObjectiveCard
  ): number {
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.text(objective.name?.toUpperCase(), leftMargin, line);
    this._doc.text(objective.rewardType, leftMargin + 65, line);
    this._doc.text(`${objective.streetcred}SC`, leftMargin + 90, line);
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 5;
    return line;
  }
}
