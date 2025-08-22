import { Injectable } from '@angular/core';
import { iCrCzSquad } from '../../models/cr-cz-squad';
import { jsPDF } from 'jspdf';
import { PdfPageOrientation } from './../../../shared/enums';
import {
  PdfPageSettings,
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
    let left: number = PdfPageSettings.MARGIN_LEFT + 1;
    // set the squad name
    line = this.createTitle(
      line,
      PdfPageSettings.MIDPAGE_LANDSCAPE,
      `TEAM NAME: ${squad.name?.toUpperCase()}`
    );
    line = this.createTitle(
      line,
      PdfPageSettings.MIDPAGE_LANDSCAPE,
      squad.faction?.toUpperCase()
    );
    const mercs = squad.units.filter(
      (unit) => !unit.keywords.includes(squad.faction) && unit.isMerc
    );
    const gearCount = squad.units.reduce((a, b) => a + b.gearCards.length, 0);
    const leaders = squad.units.filter((unit) => unit.isLeader);
    line = this.createSummaryRow(
      line,
      left,
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
    let pageTop = line;
    line = this.createTeamMemberHeader(line, left);
    squad.units.forEach((unit) => {
      // check to see if a new page is required.
      if (this.getLineHeightOfUnit(unit) + line > PdfPageSettings.PAGE_WIDTH) {
        left =
          left === PdfPageSettings.MARGIN_LEFT
            ? PdfPageSettings.MIDPAGE_LANDSCAPE
            : PdfPageSettings.MARGIN_LEFT;
        this._doc.addPage();
        line = pageTop;
        line = this.createTeamMemberHeader(line, left);
      }

      line = this.createUnitRow(line, left, unit, squad.faction);
    });

    line += 3;
    const objectivesHeight = 7 + (squad.objectives?.length * 4);

    if (line + objectivesHeight > PdfPageSettings.PAGE_WIDTH) {
      if (left === PdfPageSettings.MARGIN_LEFT ) {
        left = PdfPageSettings.MIDPAGE_LANDSCAPE;
        line = pageTop;
      } else {
        this._doc.addPage();
        left = PdfPageSettings.MARGIN_LEFT;
        line = PdfPageSettings.MARGIN_TOP;
      }
    }

    line = this.createTitle(line, left + 35, 'ACHEIVED OBJECTIVES');
    squad.objectives.forEach((objective) => {
      line = this.createObjectivetRow(line, left, objective);
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
    let output = `Total Units: ${totalUnits}`;
    output += ` - Total EB: ${totalEb}`;
    output += ` - Total Streetcred: ${totalStreetcred}`;
    output += ` - Total Influence: ${totalInfluence}`;
    output += ` - Total Gonks: ${totalGonks}`;
    output += ` - Total Leaders: ${totalLeaders}`;
    output += ` - Total Mercs: ${totalMercs}`;
    output += ` - # Gear: ${totalGear}`;
    this._doc.text(output, PdfPageSettings.MIDPAGE_LANDSCAPE, line, {
      align: 'center',
    });
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 4;
    return line;
  }

  private createUnitHeader(line: number, leftMargin: number): number {
    this._doc.setFontSize(PdfFontSize.SM);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'italic');
    this._doc.text('Name', leftMargin, line);
    this._doc.text(`SC`, leftMargin + 92, line), { align: 'center' };
    this._doc.text(`EB`, leftMargin + 103, line, { align: 'center' });
    this._doc.text('Keywords', leftMargin + 110, line);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    line += 4;
    return line;
  }

  private getLineHeightOfUnit(unit: iCrCzUnitCard): number {
    let height = 12;
    if (unit?.gearCards?.length > 0) {
      height += unit.gearCards.length * 5;
    }

    if (unit.programs?.length > 0) {
      height += unit.programs.length * 5;
    }
    return height;
  }

  private createTeamMemberHeader(line: number, left: number): number {
    line = this.createTitle(line, left + 35,  'TEAM MEMBERS');
    line += 2;
    line = this.createUnitHeader(line, left);
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
    if (!unit.keywords.includes(squadFaction)) {
      this._doc.setFontSize(PdfFontSize.XS);
      this._doc.text(
        `** [MERC - ${squadFaction.toUpperCase()}] **`,
        leftMargin + 5,
        line + 3
      );
      this._doc.setFontSize(PdfFontSize.DEFAULT);
    }
    this._doc.text(`${unit.cred}SC`, leftMargin + 90, line);
    this._doc.text(`${unit.eb.toString()}eb`, leftMargin + 107, line, {
      align: 'right',
    });
    this._doc.text(unit.keywords.join(', '), leftMargin + 110, line);
    line += 8;
    this._doc.setFontSize(PdfFontSize.SM);
    if (unit.gearCards.length > 0) {
      this._doc.text('Gear', leftMargin + 3, line);
      unit.gearCards.forEach((gear) => {
        this._doc.text(gear.name?.toUpperCase(), leftMargin + 16, line);
        this._doc.text(`${gear?.cred}SC`, leftMargin + 90, line);
        this._doc.text(`+${gear.eb}eb`, leftMargin + 107, line, {
          align: 'right',
        });
        this._doc.text(`${gear.rarity} rarity`, leftMargin + 110, line);
        line += 3;
      });
      line += 1;
    }
    if (unit.programs.length > 0) {
      this._doc.text('Programs', leftMargin + 3, line);
      unit.programs.forEach((prog) => {
        this._doc.text(prog?.name?.toUpperCase(), leftMargin + 16, line);
        this._doc.text(`${prog?.cred ?? '-'}SC`, leftMargin + 90, line);
        this._doc.text(`+${prog.eb}eb`, leftMargin + 107, line, {
          align: 'right',
        });
        this._doc.text(`${prog.rarity} rarity`, leftMargin + 110, line);
        line += 3;
      });
      line += 1;
    }
    this._doc.text(`Total Cost: `, leftMargin + 90, line, { align: 'right' });
    this._doc.text(`${unit.totalCost}eb`, leftMargin + 107, line, {
      align: 'right',
    });
    line += 1;
    this._doc.setLineWidth(0.5);
    this._doc.setDrawColor('#AAAAAA');
    this._doc.line(leftMargin, line, leftMargin + 135, line);
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
    this._doc.text(`${objective.cred}SC`, leftMargin + 90, line);
    this._doc.setFontSize(PdfFontSize.DEFAULT);
    this._doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += 5;
    return line;
  }
}
