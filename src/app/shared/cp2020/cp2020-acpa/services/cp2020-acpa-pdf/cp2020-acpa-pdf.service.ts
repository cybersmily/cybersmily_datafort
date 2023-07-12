import { Cp2020ACPAWeapon } from './../../models/cp2020-acpa-weapon';
import { Cp2020ACPAComponent } from './../../models/cp2020-acpa-component';
import { Cp2020ACPALocation } from './../../models/cp2020-acpa-location';
import { PdfPageSettings } from './../../../../enums/pdf-page-settings';
import { jsPDF } from 'jspdf';
import { PdfGeneratorService } from './../../../../services/pdf-services/pdf-generator.service';
import { Cp2020ACPA } from './../../models/cp2020-acpa';
import { Injectable } from '@angular/core';
import { PdfPageOrientation } from './../../../../enums';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ACPAPdfService {
  constructor(private PdfGeneratorService: PdfGeneratorService) {}

  saveFile(acpa: Cp2020ACPA) {
    const doc = this.PdfGeneratorService.createDoc(PdfPageOrientation.PORTRAIT);
    const titlePrefix = acpa.isWad
      ? 'W O R K I N G  A S S I S T A N T  D R O N E S'
      : 'P O W E R   A R M O R';
    let line = this.addTitle(
      doc,
      PdfPageSettings.MARGIN_TOP - 5,
      `${titlePrefix}   S P E C I F I C A T I O N S`
    );
    line = this.addDetailsSection(doc, acpa, line);
    line = this.addTitle(doc, line, 'S   P   A   C   E   S');
    line = this.addSpaceSection(doc, acpa, line);
    line = this.checkPageHeight(line, doc);
    line = this.addTitle(
      doc,
      line,
      'E Q U I P M E N T   C A R R I E D / I N S T A L L E D'
    );
    line = this.addCarriedSection(doc, acpa, line);
    doc.addPage();
    line = PdfPageSettings.MARGIN_TOP - 5;
    line = this.addTitle(doc, line, 'N    O    T    E    S');
    line = this.addNoteSection(doc, acpa, line);

    doc.save('cp2020_acpa.pdf');
  }

  private checkPageHeight(line: number, doc: jsPDF): number {
    if (line > PdfPageSettings.PAGE_HEIGHT) {
      doc.addPage();
      return PdfPageSettings.MARGIN_TOP - 5;
    }
    return line;
  }

  private addTitle(doc: jsPDF, line: number, title: string): number {
    doc.setFontSize(14);
    doc.setFillColor('black');
    doc.rect(PdfPageSettings.MARGIN_LEFT, line, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text(title, PdfPageSettings.MIDPAGE, line + 5, { align: 'center' });
    doc.setTextColor('black');
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    doc.setFontSize(9);
    return line + PdfPageSettings.LINEHEIGHT;
  }

  private addDetailsSection(
    doc: jsPDF,
    acpa: Cp2020ACPA,
    line: number
  ): number {
    const start = line;
    const left = PdfPageSettings.MARGIN_LEFT + 3;
    doc.text(`NAME: ${acpa.name.toUpperCase()}`, left, line + 5);
    doc.text(
      `MANUFACTURER: ${acpa.manufacturer.toUpperCase()}`,
      PdfPageSettings.MIDPAGE,
      line + 5
    );
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(
      `TOTAL WEIGHT: ${acpa.totalWeight.toLocaleString()}kg`,
      left,
      line + 5
    );
    doc.text(
      `TOTAL COST: ${acpa.totalCost.toLocaleString()}eb`,
      PdfPageSettings.MIDPAGE,
      line + 5
    );
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(
      `CHASSIS TYPE: ${acpa.chassis.name.toUpperCase()} STR ${
        acpa.chassis.str
      }`,
      left,
      line + 5
    );
    doc.text(
      `CHASSIS WEIGHT: ${acpa.chassis.weight.toLocaleString()}kg`,
      PdfPageSettings.MIDPAGE,
      line + 5
    );
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(`ARMOR: SP ${acpa.armor.sp}`, left, line + 5);
    doc.text(
      `CHASSIS CAPACITY/LIFT: ${acpa.chassis.carry.toLocaleString()}kg/${acpa.chassis.lift.toLocaleString()}kg`,
      PdfPageSettings.MIDPAGE,
      line + 5
    );
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(
      `SIB/DFB: ${acpa.sib > 0 ? '+' : ''}${acpa.sib}/${
        acpa.sib > 0 ? '+' : ''
      }${acpa.dfb}`,
      left,
      line + 5
    );
    if (acpa.isWad) {
      doc.text(
        `MOVE ALLOWANCE: ${acpa.ma.toLocaleString()}`,
        PdfPageSettings.MIDPAGE,
        line + 5
      );
    } else {
      doc.text(
        `TROOPER SIZE: ${acpa.trooperSize.toLocaleString()}kg`,
        PdfPageSettings.MIDPAGE,
        line + 5
      );
    }
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(
      `PUNCH:${acpa.punch}    KICK:${acpa.kick}    CRUSH:${acpa.crush}`,
      left,
      line + 5
    );
    doc.text(
      `TOUGHNESS MODIFIER: ${acpa.chassis.toughness}`,
      PdfPageSettings.MIDPAGE,
      line + 5
    );
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(
      `REALITY INTERFACE: ${acpa.realityInterface.name.toUpperCase()}`,
      left,
      line + 5
    );
    doc.text(
      `CONTROL SYSTEM: ${acpa.controlSystem.name.toUpperCase()}`,
      PdfPageSettings.MIDPAGE,
      line + 5
    );
    line += PdfPageSettings.LINEHEIGHT_SM + 3;

    doc.rect(
      PdfPageSettings.MARGIN_LEFT,
      start,
      PdfPageSettings.MARGIN_RIGHT - PdfPageSettings.MARGIN_LEFT,
      line - start,
      'S'
    );

    return line;
  }

  private addSpaceSection(doc: jsPDF, acpa: Cp2020ACPA, line: number): number {
    let start = line;
    let end = line;
    let left = PdfPageSettings.MARGIN_LEFT.valueOf();
    const width = 33.3;
    line = this.addLocationSection(
      doc,
      'HEAD (1)',
      start,
      left,
      width,
      acpa.locations.head
    );
    end = line > end ? line : end;
    doc.rect(left, start, width, end - start, 'S');
    left += width;
    line = this.addLocationSection(
      doc,
      'R.ARM (2)',
      start,
      left,
      width,
      acpa.locations.arms[0]
    );
    end = line > end ? line : end;
    doc.rect(left, start, width, end - start, 'S');
    left += width;
    line = this.addLocationSection(
      doc,
      'L.ARM (3)',
      start,
      left,
      width,
      acpa.locations.arms[1]
    );
    end = line > end ? line : end;
    doc.rect(left, start, width, end - start, 'S');
    left += width;
    line = this.addLocationSection(
      doc,
      'R.LEG (4-5)',
      start,
      left,
      width,
      acpa.locations.legs[0]
    );
    end = line > end ? line : end;
    doc.rect(left, start, width, end - start, 'S');
    left += width;
    line = this.addLocationSection(
      doc,
      'L.LEG (6-7)',
      start,
      left,
      width,
      acpa.locations.legs[1]
    );
    end = line > end ? line : end;
    doc.rect(left, start, width, end - start, 'S');
    left += width;
    line = this.addLocationSection(
      doc,
      'TORSO (9-0)',
      start,
      left,
      width,
      acpa.locations.torso
    );
    end = line > end ? line : end;
    doc.rect(left, start, width, end - start, 'S');
    doc.rect(PdfPageSettings.MARGIN_LEFT, start, 200, end - start, 'S');
    if (acpa.locations.arms.length > 2 || acpa.locations.legs.length > 2) {
      start = end;
      left = PdfPageSettings.MARGIN_LEFT;
      acpa.locations.arms.slice(0, 2).forEach((arm, index) => {
        line = this.addLocationSection(
          doc,
          `EXTRA ARM${index + 1}`,
          start,
          left,
          width,
          arm
        );
        end = line > end ? line : end;
        doc.rect(left, start, width, end - start, 'S');
        left += width;
      });
      acpa.locations.legs.slice(0, 2).forEach((leg, index) => {
        line = this.addLocationSection(
          doc,
          `EXTRA LEG${index + 1}`,
          start,
          left,
          width,
          leg
        );
        end = line > end ? line : end;
        doc.rect(left, start, width, end - start, 'S');
        left += width;
      });
      end = line > end ? line : end;
      doc.rect(left, start, width, end - start, 'S');
      doc.addPage();
      line = PdfPageSettings.MARGIN_TOP + 5;
    }

    return line;
  }

  private addLocationSection(
    doc: jsPDF,
    title: string,
    line: number,
    left: number,
    width: number,
    location: Cp2020ACPALocation
  ): number {
    left += 1;
    let leftMargin = left + width - 2;
    const center = left + Math.floor(width / 2);
    doc.text(`${title}`, center, line + 5, { align: 'center' });
    doc.rect(left - 1, line, width, PdfPageSettings.LINEHEIGHT, 'S');

    line += PdfPageSettings.LINEHEIGHT_XS;
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    doc.text(`SP ${location.sp}`, left, line + 5);
    doc.text(`SDP ${location.sdp}`, center, line + 5);
    line += PdfPageSettings.LINEHEIGHT_XS;
    doc.setFontSize(7);
    doc.text(`INTERNAL`, left, line + 5);
    doc.text(`SDP`, leftMargin, line + 5, { align: 'right' });
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += PdfPageSettings.LINEHEIGHT_XS;
    location.internalComponents.forEach((item, i) => {
      let lead = i % 4 === 0 ? `${Math.floor(i / 4) + 1} ` : '   ';
      let name = item?.name.startsWith('(')
        ? '  *see above*'
        : item?.name ?? '';
      doc.text(`${lead}${name}`, left, line + 5);
      doc.text(`${item?.sdp ?? '-'}`, leftMargin, line + 5, { align: 'right' });
      line += PdfPageSettings.LINEHEIGHT_XXS;
    });
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'bold');
    line += PdfPageSettings.LINEHEIGHT_XS;
    /* External location items */
    doc.text(`EXTERNAL`, left, line + 5);
    doc.text(`SP/SDP`, leftMargin, line + 5, { align: 'right' });
    doc.setFont(PdfPageSettings.DEFAULT_FONT, 'normal');
    line += PdfPageSettings.LINEHEIGHT_XXS;
    location.externalComponents.forEach((item, i) => {
      let lead = i % 4 === 0 ? `${Math.floor(i / 4) + 1} ` : '   ';
      let name = item?.name.startsWith('(')
        ? '  *see above*'
        : item?.name ?? '';
      doc.text(`${lead}${name}`, left, line + 5);
      doc.text(`${item?.sp ?? '-'}/${item?.sdp ?? '-'}`, leftMargin, line + 5, {
        align: 'right',
      });
      line += PdfPageSettings.LINEHEIGHT_XXS;
    });
    doc.setFontSize(9);

    return line + PdfPageSettings.LINEHEIGHT;
  }

  private addCarriedSection(
    doc: jsPDF,
    acpa: Cp2020ACPA,
    line: number
  ): number {
    const start = line;
    const columnIndex = Math.ceil(acpa.equipment.length / 2);
    const newline = this.addCarriedColumn(
      doc,
      start,
      PdfPageSettings.MARGIN_LEFT,
      PdfPageSettings.MIDPAGE - 10,
      acpa.equipment.slice(0, columnIndex)
    );
    line = this.addCarriedColumn(
      doc,
      start,
      PdfPageSettings.MIDPAGE,
      PdfPageSettings.MARGIN_RIGHT - 10,
      acpa.equipment.slice(columnIndex)
    );
    line = newline > line ? newline : line;
    doc.rect(PdfPageSettings.MARGIN_LEFT, start, 100, line - start, 'S');
    doc.rect(PdfPageSettings.MARGIN_LEFT, start, 200, line - start, 'S');

    return line + PdfPageSettings.LINEHEIGHT;
  }

  private addCarriedColumn(
    doc: jsPDF,
    line: number,
    left: number,
    right: number,
    components: Array<Cp2020ACPAComponent | Cp2020ACPAWeapon>
  ): number {
    const start = line;
    line += PdfPageSettings.LINEHEIGHT_SM;
    doc.text(`ITEM`, left + 1, line);
    doc.text(`SP/SDP/WT`, right, line, { align: 'right' });
    line += PdfPageSettings.LINEHEIGHT_XXS;
    doc.rect(left, start, right - left + 10, line - start, 'S');
    components.forEach((item) => {
      doc.text(`${item.name}`, left + 1, line + 5);
      doc.text(
        `${item?.sp ?? '-'}/${item?.sdp ?? '-'}/${
          item?.weight.toLocaleString() ?? '-'
        }kg`,
        right,
        line + 5,
        { align: 'right' }
      );
      line += PdfPageSettings.LINEHEIGHT_SM;
    });
    line += PdfPageSettings.LINEHEIGHT_XXS;
    return line;
  }

  private addNoteSection(doc: jsPDF, acpa: Cp2020ACPA, line: number): number {
    const start = line;
    line += PdfPageSettings.LINEHEIGHT_SM;
    const notes = doc.splitTextToSize(acpa.notes, 195);
    notes.forEach((note) => {
      doc.text(`${note}`, PdfPageSettings.MARGIN_LEFT + 2, line);
      line += PdfPageSettings.LINEHEIGHT_SM;
    });
    doc.rect(PdfPageSettings.MARGIN_LEFT, start, 200, line - start, 'S');

    return line + PdfPageSettings.LINEHEIGHT;
  }
}
