import { CelsiusPipe } from './../../shared/pipes/celsius.pipe';
import { CpRedDayWeather } from './cp-red-day-weather';
import { jsPDF } from 'jspdf';

export class CpRedDayWeatherPdf {
  private static _left = 5;
  private static _top = 10;
  private static _midPage = 150;
  private static _fontSize = 11;
  private static _font = 'Arial';

  private static _daysOfWekk = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


  static createWeatherPDF(results: Array<CpRedDayWeather>) {
    const doc: jsPDF = this.setupDoc();
    let col = this._left;
    let line = this._top;
    doc.setFillColor('red');
    doc.setTextColor('white');
    const ht = results.length > 7 ? 205
     : 60;
    doc.roundedRect(15, 3, 254, ht, 3, 3, 'F');
    doc.setFont(this._font, 'bold');
    doc.setFontSize(15);
    doc.text('CYBERPUNK WEATHER', this._midPage, line, { align: 'center' });
    doc.setFontSize(this._fontSize);
    line += 4;
    doc.setTextColor('black');
    doc.setFillColor('white');
    this.drawWeather(doc, results, col + 15, line);
    doc.save('CP_Weather.pdf');
  }

  private static setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'l', // landscape
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

  private static drawWeather(doc: jsPDF, results: Array<CpRedDayWeather>, left: number, line: number) {
    let margin = left;
    results.forEach( (day, i) => {
      if( i > 0 && i%7 === 0) {
        line += 38;
        margin = left;
      }
      if(results.length === 1) {
        margin = left + 117;
      }
      doc.setFont(this._font, 'bold');
      const center = margin + 17;
      doc.setFontSize(12);
      doc.setFillColor('white');
      doc.roundedRect(margin, line, 34, 37, 3, 3, 'F');
      const dayOfWeek = (results.length < 2) ? 'TODAY' : this._daysOfWekk[i%7];
      doc.text(dayOfWeek, center, line + 5, {align: 'center'});
      this.setTemp(doc, day.tempature, center, line);
      doc.setFontSize(8);
      doc.setFont(this._font, 'normal');
      const cond = doc.splitTextToSize(day.condition, 30);
      doc.text(cond, center, line + 27, {align: 'center'});
      margin += 35;
    });
  }

  private static setTemp(doc: jsPDF, temp: number, center: number, line: number) {
    center += 4;
    doc.setFontSize(22);
    doc.text(temp.toString(), center, line + 12, {align: 'right'});
    doc.setFontSize(8);
    doc.text('O F', center, line + 8, {align: 'left'});

    doc.setFontSize(22);
    const celsius = new CelsiusPipe().transform(temp);
    doc.text(celsius.toString(), center, line + 21, {align: 'right'});
    doc.setFontSize(8);
    doc.text('O C', center, line + 17, {align: 'left'});
    doc.setFontSize(this._fontSize);
  }
}
