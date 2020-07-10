import * as jsPDF from 'jspdf';
import { NetRunProgram } from '../netrun';

export class ProgramListToPdf {
  private _left = 5;
  private _top = 15;
  private _midPage = 105;
  private _fontSize = 11;

   generatePdf( list: Array<NetRunProgram>) {
    const doc: jsPDF = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    });
    doc.setFontSize(this._fontSize);
    let col = this._left;
    let line = this._top;
    let nextLine = this._top;
    doc.setFontStyle('bold');
    doc.setFontSize(15);
    doc.text('CYBERPUNK 2020 PROGAM LIST', this._midPage, line, 'center');
    doc.setFontSize(this._fontSize);
    line += 20;
    list.forEach( (d, i) => {
      const newLine = this.addProgram(doc, d, line, col);
      nextLine = (newLine > nextLine) ? newLine : nextLine;
      if ( nextLine > 240 ) {
        line = this._top;
        doc.addPage();
      }
      if (((i + 1)) % 2 === 0) {
        col = this._left;
        line = nextLine;
      } else {
        col = this._midPage;
      }
    });
    doc.save('CP_ProgramList.pdf');
  }

  addProgram(doc: jsPDF, prog: NetRunProgram, line: number, column: number ): number {
    doc.setFontStyle('bold');
    doc.setFontSize(13);
    doc.text(prog.name, column, line);
    doc.setFontStyle('normal');
    doc.text(`${prog.cost}eb`, column + 90, line, 'right');
    doc.setFontSize(this._fontSize);
    line += 7;
    doc.text(`Class: ${prog.class.name}`, column, line);
    line += 7;
    doc.text(`Strength: +${prog.strength}`, column, line);
    doc.text(`MU: ${prog.mu}`, column + 90, line, 'right');
    line += 7;
    const options  = prog.options.map(o => o.name).join(', ');
    const optList: Array<string> = doc.splitTextToSize(`Options: ${options}`, 90);
    optList.forEach( d => {
      doc.text(d, column, line);
      line += 7;
    });
    line += 2;

    const desc: Array<string> = doc.splitTextToSize(`    ${prog.description}`, 90);
    desc.forEach( d => {
      doc.text(d, column, line);
      line += 7;
    });
    line += 2;
    const icon: Array<string> = doc.splitTextToSize((`Icon: ${prog.icon}`), 90);
    icon.forEach( d => {
      doc.text(d, column, line);
      line += 7;
    });
    return line;
  }
}
