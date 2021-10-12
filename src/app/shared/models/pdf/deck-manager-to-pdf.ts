import { Cp2020NetrunDeck } from '../../cp2020/cp2020-netrun-gear/models';
import { Cp2020ProgramList } from '../../cp2020/cp2020-netrun-gear/models';
import { Cp2020DeckManager } from '../../cp2020/cp2020-netrun-gear/models';
import { jsPDF } from 'jspdf';
import { NetRunProgram } from '../../cp2020/cp2020-netrun-gear/models';

export class DeckManagerToPdf {
  private static _left = 5;
  private static _top = 15;
  private static _midPage = 105;
  private static _fontSize = 11;
  private static _font = '';

  static generatePdf( manager: Cp2020DeckManager) {
    const doc: jsPDF = this.setupDoc();

    let line = this._top;
    line = this.addHeader(doc, 'CYBERPUNK 2020 DECK MANAGER', line);

    line = this.addHeader(doc, 'DECK', line);
    line = this.addDeck(doc, manager.deck, line);

    line = this.addHeader(doc, 'PROGRAMS', line);
    line = this.addProgramList(doc, manager.programList, line);

    doc.save('CP_DeckManager.pdf');
  }

  private static setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    });
     // verify that Arial is a font.
     this._font = this.getFont(doc.getFontList());
    doc.setFont(this._font);
    doc.setFontSize(this._fontSize);
   return doc;
  }

  private static getFont(fonts: any): string {
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

  private static addHeader(doc: jsPDF, text: string, line: number): number {
    doc.setFont(this._font, 'bold');
    doc.setFontSize(15);
    doc.text(text, this._midPage, line, {align: 'center'});
    doc.setFontSize(this._fontSize);
    line += 20;
    return line;
  }

  private static addDeck(doc: jsPDF, deck: Cp2020NetrunDeck, line: number): number {
    doc.setFont('bold');
    doc.setFontSize(13);
    doc.text(deck.name, this._left, line);
    doc.setFont(this._font, 'normal');
    doc.text(`${deck.cost}eb`, this._left + 190, line, { align: 'right'});
    doc.setFontSize(this._fontSize);
    line += 7;
    if (deck.type) {
      doc.text(`Chassis: ${deck.type.name}`, this._left, line);
      line += 7;
    }
    doc.text(`Speed: +${deck.speed}`, this._left, line);
    doc.text(`DataWall: ${deck.dataWall}`, this._left + 60, line, { align: 'right'});
    doc.text(`MU: ${deck.totalMU}`, this._left + 120, line, { align: 'right'});
    line += 7;
    const options  = deck.options.map(o => (o.count && o.count > 1 ? o.count + ' ' : '' ) + o.name).join(', ');
    const optList: Array<string> = doc.splitTextToSize(`Options: ${options}`, 200);
    optList.forEach( d => {
      doc.text(d, this._left, line);
      line += 7;
    });
    line += 2;

    const desc: Array<string> = doc.splitTextToSize(`  ${deck.description}`, 200);
    desc.forEach( d => {
      doc.text(d, this._left, line);
      line += 7;
    });
    line += 2;

    return line;
  }

  private static addProgramList(doc: jsPDF, list: Cp2020ProgramList, line: number): number {
    let col = this._left;
    let nextLine = line;
    let i = 0;
    list.programs.forEach( (d) => {
      const newLine = this.addProgram(doc, d, line, col);
      nextLine = (newLine > nextLine) ? newLine : nextLine;
      if ( nextLine > 240 ) {
        line = this._top;
        nextLine = line;
        doc.addPage();
        i = 1;
      }
      if (((i + 1)) % 2 === 0) {
        col = this._left;
        line = nextLine;
      } else {
        col = this._midPage;
      }
      i++;
    });
    return line;
  }

  private static addProgram(doc: jsPDF, prog: NetRunProgram, line: number, column: number ): number {
    doc.setFont(this._font, 'bold');
    doc.setFontSize(13);
    doc.rect(column, line - 3, 3, 3, 'S');
    doc.text(prog.name, column + 4, line);
    doc.setFont(this._font, 'normal');
    doc.text(`${prog.cost}eb`, column + 90, line, { align: 'right'});
    doc.setFontSize(this._fontSize);
    line += 7;
    doc.text(`Class: ${prog.class.name}`, column, line);
    line += 7;
    doc.text(`Strength: +${prog.strength}`, column, line);
    doc.text(`MU: ${prog.mu}`, column + 90, line, { align: 'right'});
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
    line += 2;
    return line;
  }
}
