import { Injectable } from '@angular/core';
import {jsPDF} from 'jspdf';
import { Cp2020StatBlock } from '../../models';
import { PdfPageSettings } from '../../../../enums';

@Injectable({
  providedIn: 'root'
})
export class Cp2020StatsSectionPdfService {

  constructor() { }

  addStatsSection(doc: jsPDF, stats: Cp2020StatBlock, rep: number, combatSense: number, line: number, left: number, lineHeight: number): number {
    return this.addStats(doc, stats, rep, combatSense, line, left, lineHeight);
  }

  private addStats(
    doc: jsPDF
    , stats: Cp2020StatBlock
    , rep: number
    , combatSense: number
    , line: number
    , left: number
    , lineheight: number
  ): number {
    doc.setFillColor('black');
    doc.rect(left, line, 20, lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text('STATS', left + 3, line + 5);
    doc.rect(left + 20, line, 15, lineheight, 'S');
    doc.setTextColor('black');
    doc.setFillColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    doc.text(stats.BasePoints?.toString() ?? '', left + 23, line + 5);

    doc.setFillColor('black');
    doc.rect(left + 40, line, 15, lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text('REP', left + 43, line + 5);
    doc.rect(left + 55, line, 10, lineheight, 'S');
    doc.setTextColor('black');
    doc.setFillColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    doc.text(rep?.toString() ?? '', left + 60, line + 5);

    doc.setFillColor('black');
    doc.rect(left + 70, line, 15, lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text('INIT', left + 73, line + 5);
    doc.rect(left + 85, line, 10, lineheight, 'S');
    doc.setTextColor('black');
    doc.setFillColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    let init: number = stats.REF.Adjusted;
    init += combatSense || 0;
    init += stats.initiativeModifiers.reduce((a, b) => a + b.mod, 0);
    doc.text(init?.toString() ?? '', left + 90, line + 5);

    line = line + 12;
    doc.setTextColor('black');
    doc.text(
      `INT [ ${stats.INT.Adjusted} ]   REF [ ${stats.REF.Adjusted} ]   TECH [ ${stats.TECH.Adjusted}]   COOL [ ${stats.COOL.Adjusted} ]`,
      left,
      line
    );
    line = line + 5.5;
    doc.text(
      `ATTR [ ${stats.ATTR.Adjusted} ]   LUCK [ ${stats.LUCK.Adjusted} ]   MA [ ${stats.MA.Adjusted} ]  BODY [ ${stats.BODY.Adjusted} ] EMP [ ${stats.EMP.Adjusted} ]`,
      left,
      line
    );
    line = line + 5.5;
    doc.text(
      `Run [ ${stats.Run}m ]   Leap [ ${stats.Leap}m ]  Lift [ ${
        stats.Lift
      }kg ] Hum. [ ${stats.CurrentHumanity?.toString()} ]`,
      left,
      line
    );
    return line + 2.5;
  }

}
