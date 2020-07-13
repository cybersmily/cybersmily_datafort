import * as jsPDF from 'jspdf';
import { Cp2020Drug, Cp2020DrugList } from './../drug';

export class DruglabToPDF {
  private _left = 5;
  private _top = 15;
  private _midPage = 105;
  private _fontSize = 11;

   generatePdf( drugList: Cp2020DrugList) {
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
    doc.text('CYBERPUNK 2020 DRUG LAB', this._midPage, line, 'center');
    doc.setFontSize(this._fontSize);
    line += 20;
    drugList.items.forEach( (d, i) => {
      const newLine = this.addDrug(doc, d, line, col);
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
    doc.save('CP_DrugLab.pdf');
  }

  private addDrug(doc: jsPDF, drug: Cp2020Drug, line: number, column: number): number {
    doc.setFontStyle('bold');
    doc.text(drug.name, column, line);
    doc.setFontStyle('normal');
    line += 7;
    doc.text(`Strength: +${drug.strength}`, column + 50, line);
    const effects: Array<string> = doc.splitTextToSize(`Type: ${drug.effectList}`, 45);
    effects.forEach( e => {
      doc.text(e, column, line);
      line += 7;
    });
    doc.text(`Difficulty: ${drug.diff}`, column, line);
    doc.text(`Cost: ${drug.cost}`, column + 50, line);
    line += 7;
    doc.text(`Duration: ${drug.duration}`, column, line);
    line += 7;
    const sideEffects: Array<string> = doc.splitTextToSize(`Side Effects: ${drug.sideEffectList}`, 90);
    sideEffects.forEach( e => {
      doc.text(e, column, line);
      line += 7;
    });
    const desc: Array<string> = doc.splitTextToSize(drug.description, 90);
    desc.forEach( d => {
      doc.text(d, column, line);
      line += 7;
    });
    return line;
  }
}
