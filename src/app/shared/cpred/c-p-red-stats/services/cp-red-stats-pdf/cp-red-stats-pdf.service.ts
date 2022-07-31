import { Coord } from './../../../../models/coord';
import { jsPDF } from 'jspdf';
import { CpRedCharacterStats, CpRedCharacterStat } from './../../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpRedStatsPdfService {
  constructor() {}

  drawStatSection(
    stats: CpRedCharacterStats,
    pdf: jsPDF,
    left: number,
    line: number,
    size: number
  ): Coord {
    pdf.setTextColor('black');
    const keys = Object.keys(stats);
    keys.forEach((stat) => {
      line += this.drawStat(stats[stat], pdf, left, line, size);
    });
    return { x: left, y: line };
  }

  private drawStat(
    stat: CpRedCharacterStat,
    pdf: jsPDF,
    left: number,
    line: number,
    size: number
  ): number {
    pdf.setFillColor('red');
    pdf.rect(left, line, size, size, 'F');
    pdf.setFillColor('white');
    const rside = left + size - 1;
    const lside = left + 1;
    const topSide = line + 1;
    const bottomSide = line + size - 1;
    const paths = [
      { op: 'm', c: [lside, bottomSide] },
      { op: 'l', c: [rside, bottomSide] },
      { op: 'l', c: [rside, topSide] },
      { op: 'l', c: [lside + 3, topSide] },
      { op: 'l', c: [lside, topSide + 3] },
      { op: 'h', c: [] },
    ];
    pdf.path(paths);
    pdf.fill();
    pdf.setFontSize(9);
    pdf.text(stat.name.toUpperCase(), rside - 1, topSide + 3, {
      align: 'right',
    });
    pdf.setFontSize(14);
    let center = left + size / 2;
    pdf.text(
      `${stat.base.toString()} | ${stat.modified.toString()}`,
      center,
      topSide + 10,
      {
        align: 'center',
      }
    );
    return size;
  }
}
