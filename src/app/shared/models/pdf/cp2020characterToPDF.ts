import { Cp2020CyberwarePdfService } from './../../cp2020/cp2020-cyberware/services/cp2020-cyberware-pdf/cp2020-cyberware-pdf.service';
import { Cp2020GearPdfService } from './../../cp2020/cp2020-gear/services/cp2020-gear-pdf/cp2020-gear-pdf.service';
import { Cp2020WeaponSectionPdfService } from './../../cp2020/cp2020weapons/services/cp2020-weapon-section-pdf/cp2020-weapon-section-pdf.service';
import { PdfPageSettings, PdfLineHeight, PdfFontSize } from './../../enums/pdf-page-settings';
import { Cp2020CharGenSettings } from './../../cp2020/models/cp2020-char-gen-settings';
import { Cp2020ContactSectionPdfService } from './../../cp2020/cp2020-contacts/services/cp2020-contact-section-pdf/cp2020-contact-section-pdf.service';
import { Cp2020DeckmanagerPdfSectionService } from './../../cp2020/cp2020-netrun-gear/services/cp2020-deckmanager-pdf-section/cp2020-deckmanager-pdf-section.service';
import { Cp2020ArmorPDFSectionService } from './../../cp2020/cp2020-armor/services/cp2020-armor-pdf-section/cp2020-armor-pdf-section.service';
import { Cp2020Identity } from './../../cp2020/cp2020-lifestyle/models/cp2020-identity';
import { CpHousing } from '../../cp2020/cp2020-lifestyle/models/cp-housing';
import { Cp2020Lifestyle } from './../../cp2020/cp2020-lifestyle/models/cp2020-lifestyle';
import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models/cp2020-armor-block';
import { LifePathResults } from './../../cp2020/cp2020-lifepath/models';
import { Cp2020StatBlock } from '../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerCharacter } from '../cp2020character/cp2020-player-character';

import { jsPDF } from 'jspdf';
import { LifepathEvent } from '../../cp2020/cp2020-lifepath/models';
import { Cp2020Vehicle } from '../../cp2020/cp2020-vehicles/models';
import { Cp2020SkillSectionPdService } from '../../cp2020/cp2020-skills/services/cp2020-skill-section-pdf/cp2020-skill-section-pd.service';
import { Cp2020StatsSectionPdfService } from '../../cp2020/cp2020-stats/services/cp2020-stats-section-pdf/cp2020-stats-section-pdf.service';

export class Cp2020characterToPDF {
  private _character: Cp2020PlayerCharacter;

  private _left = 5;
  private _top = 10;
  private _lineheight = 7;
  private _midPage = 105;
  private _fontSize = 11;
  private _pageHeight = PdfPageSettings.PAGE_HEIGHT.valueOf();
  private _font = 'Arial';

  constructor(
    private statsPdfService: Cp2020StatsSectionPdfService,
    private skillPdfService: Cp2020SkillSectionPdService,
    private armorPdfService: Cp2020ArmorPDFSectionService,
    private weaponPdfService: Cp2020WeaponSectionPdfService,
    private gearPdfService: Cp2020GearPdfService,
    private cyberPdfService: Cp2020CyberwarePdfService,
    private deckmanagerPdfService: Cp2020DeckmanagerPdfSectionService,
    private contactPdfService: Cp2020ContactSectionPdfService
  ) {}

  generatePdf(
    character: Cp2020PlayerCharacter,
    settings?: Cp2020CharGenSettings
  ): void {
    this._character = character;
    const doc = this.setupDoc();
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize);
    let line = this.createFirstPage(doc, settings);
    line = this.createSecondPage(doc, line, settings);
    if (this._character.vehicles.length > 0) {
      this.createVehiclesPage(doc);
    }
    if (!settings || settings.sectionSettings.showLifePath) {
      this.createLifepathPage(doc);
    }
    if (!settings || settings.sectionSettings.showLifestyle) {
      this.createLifeStylePage(doc, settings.sectionSettings.showContacts);
    }
    if (!settings || settings.sectionSettings.showNotes) {
      this.createNotesPage(doc);
    }
    const filename = this._character.handle.replace(/[^A-Za-z0-9_]/gi, '');
    doc.save(`CP2020_${filename}.pdf`);
  }

  setupDoc(): jsPDF {
    const doc = new jsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'mm',
    });
    // verify that Arial is a font.
    this._font = this.getFont(doc.getFontList());
    doc.setFont(this._font);
    doc.setFontSize(this._fontSize);
    return doc;
  }

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

  createFirstPage(doc: jsPDF, settings?: Cp2020CharGenSettings): number {
    let line = this._top;
    // add Handle
    line = this.addHandle(doc, this._character.handle, line);

    // character image
    this.addCharImage(doc, this._character.image);

    // Role
    line = this.addRole(doc, this._character.role.name, line);
    const secRole = this._character.secondaryRoles.map((role) => role.name);
    line = this.addSecondaryRole(doc, secRole.join(', '), line);

    // get combat sense
    const combatSense =
      this._character.role.specialAbility.name.toLocaleLowerCase() ===
      'combat sense'
        ? this._character.role.specialAbility.value
        : 0;

    // STATS
    line = this.statsPdfService.addStatsSection(
      doc,
      this._character.stats,
      this._character.skills.rep,
      combatSense,
      line,
      this._left,
      this._lineheight
    );

    // Armor
    line = this.addArmorBlock(doc, this._character.armor, line);
    // wounds
    line = this.addWoundRow(
      doc,
      this._character.stats.Save,
      this._character.stats.BTM,
      this._character.stats.BodyDmgMod,
      line
    );
    if (!settings || settings.sectionSettings.showSkills) {
      line = this.skillPdfService.addCharacterSheetSkillsSection(
        doc,
        this._character.skills,
        this._character.stats,
        this._left,
        line,
        this._lineheight
      );
    }
    return line;
  }

  createSecondPage(
    doc: jsPDF,
    line: number,
    settings?: Cp2020CharGenSettings
  ): number {
    if (!settings || settings.sectionSettings.showWeapons) {
      line = this.weaponPdfService.addWeaponSection(
        doc,
        this._character.weapons,
        this._font,
        this._left,
        line
      );
    }
    if (!settings || settings.sectionSettings.showArmor) {
      line = this.armorPdfService.createCp2020ArmorSection(
        doc,
        this._character.armor,
        this._font,
        this._left,
        line
      );
    }
    if (!settings || settings.sectionSettings.showCybernetics) {
      line = this.cyberPdfService.addCyberwareSection(
        doc,
        this._character.cyberware,
        this._font,
        this._left,
        line,
        PdfLineHeight.DEFAULT
      );
    }
    if (!settings || settings.sectionSettings.showGear) {
      line = this.gearPdfService.addGearSection(
        doc,
        this._character.gear,
        this._font,
        this._left,
        line,
        PdfLineHeight.DEFAULT
      );
    }
    if (!settings || settings.sectionSettings.showCyberdeck) {
      line = this.deckmanagerPdfService.createCp2020CyberdeckProgramsSection(
        doc,
        this._character.cyberdeckPrograms,
        this._font,
        this._left,
        line
      );
    }
    return line;
  }

  createVehiclesPage(doc: jsPDF) {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('VEHICLES', this._left + 2, this._top + 5);
    this.addVehicles(doc, this._character.vehicles, this._left, this._top + 7);
  }

  createLifepathPage(doc: jsPDF): void {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('LIFEPATH', this._left + 2, this._top + 5);
    this.addLifePath(doc, this._character.lifepath, this._left, this._top + 10);
  }

  createLifeStylePage(doc: jsPDF, showContacts: boolean): void {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('LIFESTYLE', this._left + 2, this._top + 5);
    const line = this.addLifeStyle(
      doc,
      this._character.lifeStyle,
      this._left,
      this._top + 10
    );
    if(showContacts) {
      this.contactPdfService.generatePDF(doc, this._character.contacts, line);
    }
  }

  createNotesPage(doc: jsPDF): void {
    doc.addPage();
    doc.setFillColor('black');
    doc.rect(this._left, this._top, 200, 7, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HISTORY & NOTES', this._left + 2, this._top + 5);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.rect(this._left, this._top, 200, this._pageHeight - this._top, 'S');
    const notes: Array<string> = doc.splitTextToSize(
      this._character.notes,
      190
    );
    let lineHeight = Math.floor(this._fontSize/2);
    let line = this._top + 13;
    notes.forEach((n) => {
      doc.text(n.trim(), this._left + 2, line);
      line += lineHeight;
    });
  }

  private addHandle(doc: jsPDF, handle: string, line: number): number {
    let rw = 25;
    doc.rect(this._left, line, rw, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('HANDLE:', this._left + 3, line + 5);
    rw = this._left + rw;
    doc.rect(rw, line, 70, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    doc.text(handle, rw + 1, line + 5);
    return line + 8;
  }

  private addRole(doc: jsPDF, role: string, line: number): number {
    doc.setFillColor('black');
    let rw = 20;
    doc.rect(this._left, line, rw, this._lineheight, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.text('ROLE:', this._left + 3, line + 5);
    rw = this._left + rw;
    doc.rect(rw, line, 75, this._lineheight, 'S');
    doc.setTextColor('black');
    doc.setFontSize(this._fontSize - 2);
    doc.setFont(this._font, 'normal');

    doc.text(role, rw + 1, line + 5);
    doc.setFontSize(this._fontSize);
    return line + 7;
  }

  private addSecondaryRole(doc: jsPDF, roles: string, line: number): number {
    let rw = 22;
    // determine if all roles will fit
    let txt = new Array<string>();
    txt = doc.splitTextToSize(roles, 74);
    let txtHt = txt.length * this._lineheight;
    txtHt = txtHt < 1 ? this._lineheight : txtHt;
    rw = this._left + rw;
    doc.rect(this._left, line, 95, txtHt, 'S');
    doc.setTextColor('black');
    doc.setFont(this._font, 'bold');
    doc.setFontSize(this._fontSize - 3);
    doc.text('SECONDARY:', this._left + 1, line + 4);
    doc.setFont(this._font, 'normal');
    line = line + 4;
    txt.forEach((t) => {
      doc.text(t, rw + 1, line);
      line += 4;
    });

    doc.setFontSize(this._fontSize);
    return line;
  }

  private addCharImage(doc: jsPDF, img: string) {
    doc.setFillColor('black');
    doc.rect(this._midPage, this._top, 100, 10, 'DF');
    doc.setTextColor('white');
    doc.setFont(this._font, 'bold');
    doc.setFontSize(15);
    doc.text('CYBERPUNK 2020', this._midPage + 25, this._top + 6);
    doc.setFillColor('white');
    doc.setTextColor('black');
    doc.roundedRect(this._midPage, this._top + 10, 100, 80, 0.5, 0.5, 'S');
    // set the width to the ratio of the image hxw
    if (img) {
      const props = doc.getImageProperties(img);
      const ratio = props.width / props.height;
      let width = ratio * 76;
      // set max width
      width = width > 96 ? 96 : width;
      // center the image
      let left = this._midPage + 50;
      left -= width / 2;
      doc.addImage(img, 'JPEG', left, this._top + 12, width, 76);
    }
    doc.setFontSize(this._fontSize);
  }


  private addArmorBlock(
    doc: jsPDF,
    armor: Cp2020ArmorBlock,
    line: number
  ): number {
    doc.setFillColor('black');
    const width = 25;
    const colWidth = 11;
    const rowHeight = 9;
    doc.rect(this._left, line, width, rowHeight, 'DF');
    doc.setTextColor('white');
    doc.text('Location', this._left + 3, line + 5);
    doc.setTextColor('black');
    doc.rect(this._left + width, line, colWidth, 9, 'S');
    doc.rect(this._left + width + colWidth * 1, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 2, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 3, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 4, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 5, line, colWidth, rowHeight, 'S');

    doc.setFontSize(9);
    let textLine = line + 4;
    let textLeft = this._left + width + 1;
    doc.text('Head\n   1', textLeft, textLine);
    doc.text('Torso\n  2-4', textLeft + colWidth * 1, textLine);
    doc.text('R.Arm\n   5', textLeft + colWidth * 2, textLine);
    doc.text('L.Arm\n   6', textLeft + colWidth * 3, textLine);
    doc.text('R.Leg\n  7-8', textLeft + colWidth * 4, textLine);
    doc.text('L.Leg\n  9-0', textLeft + colWidth * 5, textLine);
    doc.setFontSize(this._fontSize);

    line = line + 10;
    doc.setFillColor('black');
    doc.rect(this._left, line, width, rowHeight, 'DF');
    doc.setTextColor('white');
    doc.text('Armor SP', this._left + 3, line + 5);
    doc.setTextColor('black');
    doc.rect(this._left + width, line, colWidth, 9, 'S');
    doc.rect(this._left + width + colWidth * 1, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 2, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 3, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 4, line, colWidth, rowHeight, 'S');
    doc.rect(this._left + width + colWidth * 5, line, colWidth, rowHeight, 'S');

    doc.setFontSize(9);
    textLine = line + 6;
    textLeft = this._left + width + 3;
    doc.text(armor.headSP.toString(), textLeft, textLine);
    doc.text(armor.torsoSP.toString(), textLeft + colWidth * 1, textLine);
    doc.text(armor.rArmSP.toString(), textLeft + colWidth * 2, textLine);
    doc.text(armor.lArmSP.toString(), textLeft + colWidth * 3, textLine);
    doc.text(armor.rLegSP.toString(), textLeft + colWidth * 4, textLine);
    doc.text(armor.lLegSP.toString(), textLeft + colWidth * 5, textLine);
    doc.setFontSize(this._fontSize);

    return line + 10;
  }

  private addWoundRow(
    doc: jsPDF,
    save: number,
    btm: number,
    bodDmgMod: number,
    line: number
  ): number {
    doc.rect(this._left, line, 13, this._lineheight, 'S');
    doc.text('SAVE', this._left + 1, line + 5);
    doc.rect(this._left, line + this._lineheight, 13, 15, 'S');
    doc.text(save.toString(), this._left + 4, line + this._lineheight + 8);

    const left = this._left + 14;
    doc.rect(left, line, 13, this._lineheight + 15, 'S');
    doc.text('BTM', left + 2, line + 5);
    doc.text(btm.toString(), left + 4, line + 10);
    doc.text('BDM', left + 2, line + 15);
    const prefix = bodDmgMod > 0 ? '+' : '';
    doc.text(`${prefix}${bodDmgMod}`, left + 4, line + 20);
    doc.setFont(this._font, 'normal');
    const woundWidth = 12;
    this.addWounds(doc, 'LIGHT', 0, line + 2, left + 14, woundWidth);
    this.addWounds(doc, 'SERIOUS', -1, line + 2, left + 26, woundWidth);
    this.addWounds(doc, 'CRITICAL', -2, line + 2, left + 38, woundWidth);
    this.addWounds(doc, 'MORTAL0', -3, line + 2, left + 50, woundWidth);
    this.addWounds(doc, 'MORTAL1', -4, line + 2, left + 62, woundWidth);

    this.addWounds(doc, 'MORTAL2', -5, line + 12, left + 14, woundWidth);
    this.addWounds(doc, 'MORTAL3', -6, line + 12, left + 26, woundWidth);
    this.addWounds(doc, 'MORTAL4', -7, line + 12, left + 38, woundWidth);
    this.addWounds(doc, 'MORTAL5', -8, line + 12, left + 50, woundWidth);
    this.addWounds(doc, 'MORTAL6', -9, line + 12, left + 62, woundWidth);
    line += this._lineheight + 17;
    return line;
  }

  private addWounds(
    doc: jsPDF,
    level: string,
    stun: number,
    line: number,
    left: number,
    width: number
  ) {
    doc.setFontSize(6);
    const center = left +  (width/2);
    doc.text(level, center, line, { align: "center"});
    line = line + 1;
    doc.setFontSize(7);
    doc.rect(center - 4, line, 2, 2, 'S');
    doc.rect(center - 2, line, 2, 2, 'S');
    doc.rect(center, line, 2, 2, 'S');
    doc.rect(center + 2, line, 2, 2, 'S');
    line = line + 2.4;
    doc.rect(left, line, width, 4, 'DF');
    doc.setTextColor('white');
    doc.text(`Stun=${stun}`, left + 1, line + 2.5);
    doc.setTextColor('black');
    doc.setFontSize(this._fontSize);
  }

  private addVehicles(
    doc: jsPDF,
    vehicles: Array<Cp2020Vehicle>,
    left: number,
    line: number
  ) {
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');

    let newLine = line;
    vehicles.forEach((veh, i) => {
      line = i % 2 === 1 ? newLine : line;
      left = i % 2 === 1 ? this._left : left + 100;
      line = this.addVehicleDetail(doc, veh, left, line);
      line += 10;
    });
  }

  private addVehicleDetail(
    doc: jsPDF,
    vehicle: Cp2020Vehicle,
    left: number,
    line: number
  ): number {
    const height = line;
    line += 4;
    const ht = 5;
    const colOneLeft = left + 3;
    const colTwoLeft = left + 50;
    doc.setFont(this._font, 'bold');
    doc.setFontSize(this._fontSize);
    doc.text(vehicle.name, left + 1, line);
    doc.setFont(this._font, 'normal');
    doc.setFontSize(this._fontSize - 3);
    line += ht;
    doc.text(`Type: ${vehicle.type}`, colOneLeft, line);
    doc.text(`SDP/SP: ${vehicle.sdp}/${vehicle.sp}`, colTwoLeft, line);
    line += ht;
    doc.text(`Speed: ${vehicle.speed}mph`, colOneLeft, line);
    doc.text(
      `Acc/Dec: ${vehicle.accelerate}mph/${vehicle.decelerate}mph`,
      colTwoLeft,
      line
    );
    line += ht;
    doc.text(`Range: ${vehicle.range}miles`, colOneLeft, line);
    doc.text(`Manuever: ${vehicle.manuever}`, colTwoLeft, line);
    line += ht;
    doc.text(
      `Crew/Passengers: ${vehicle.crew}/${vehicle.passengers}`,
      colOneLeft,
      line
    );
    doc.text(`Cargo: ${vehicle.cargo}`, colTwoLeft, line);
    line += ht;
    doc.text(`OffRoad: ${vehicle.offRoad}`, colOneLeft, line);
    doc.text(`Cost: ${vehicle.cost}eb`, colTwoLeft, line);
    line += ht;
    const wpnstring = vehicle.weapons.map((wpn) => wpn.name).join(', ');
    const wpnText = doc.splitTextToSize(`Weapons: ${wpnstring}`, 100);
    wpnText.forEach((txt) => {
      doc.text(txt, colOneLeft, line);
      line += ht;
    });
    const optstring = vehicle.options.map((opt) => opt.name).join(', ');
    const optText = doc.splitTextToSize(`Options: ${optstring}`, 100);
    optText.forEach((txt) => {
      doc.text(txt, colOneLeft, line);
      line += ht;
    });
    const desc = doc.splitTextToSize(
      `Description: ${vehicle.description}`,
      100
    );
    doc.text(desc, colOneLeft, line);
    line += ht;

    doc.rect(left, height, 100, line - height, 'S');

    return line;
  }

  private printLifepathLine(
    doc: jsPDF,
    title: string,
    value: string,
    margin: number,
    left: number,
    line: number
  ): number {
    doc.text(title, left + 5, line + 5);
    doc.setFont(this._font, 'normal');
    doc.text(value, left + margin, line + 5);
    line += 6.5;
    return line;
  }

  private addLifePath(
    doc: jsPDF,
    lifepath: LifePathResults,
    left: number,
    line: number
  ) {
    const ht = 6.5;
    const recth = 6;
    let startLine = line;
    let secondLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');

    // Style
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Style', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht;
    let margin = 28;
    line = this.printLifepathLine(
      doc,
      'Clothes',
      lifepath.appearance.clothes,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Hair',
      lifepath.appearance.hairstyle,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Affections',
      lifepath.appearance.affectations,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Ethnicity',
      lifepath.ethnicity.name,
      margin,
      left,
      line
    );
    line = this.printLifepathLine(
      doc,
      'Language',
      lifepath.ethnicity.language,
      margin,
      left,
      line
    );
    doc.rect(left, startLine, 200, 39, 'S');

    // Motivations
    doc.setFillColor('black');
    doc.rect(this._midPage, secondLine, 25, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Motivations', this._midPage + 2, secondLine + 4);
    doc.setTextColor('black');
    secondLine += ht;
    margin = 40;
    secondLine = this.printLifepathLine(
      doc,
      'Traits:',
      lifepath.motivations.personality,
      margin,
      this._midPage,
      secondLine
    );
    secondLine = this.printLifepathLine(
      doc,
      'Valued Person:',
      lifepath.motivations.valuedperson,
      margin,
      this._midPage,
      secondLine
    );
    secondLine = this.printLifepathLine(
      doc,
      'Value Most:',
      lifepath.motivations.valuemost,
      margin,
      this._midPage,
      secondLine
    );
    const feel =
      lifepath.motivations.feelaboutpeople.length > 30
        ? lifepath.motivations.feelaboutpeople.substring(0, 30) + '...'
        : lifepath.motivations.feelaboutpeople;
    secondLine = this.printLifepathLine(
      doc,
      'Feel About People:',
      feel,
      margin,
      this._midPage,
      secondLine
    );
    secondLine = this.printLifepathLine(
      doc,
      'Valued Possesion:',
      lifepath.motivations.valuedpossession,
      margin,
      this._midPage,
      secondLine
    );

    // Family
    startLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');
    doc.rect(left, line, 40, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Family Background', left + 2, line + 4);
    doc.setTextColor('black');

    line += ht;
    doc.setFont(this._font, 'normal');
    if (lifepath.family.familyRanking && lifepath.family.familyRanking !== '') {
      doc.text('Ranking: ' + lifepath.family.familyRanking, left + 5, line + 4);
    }
    line += ht;
    let fam = new Array<string>();
    if (
      lifepath.family.familyBackground &&
      lifepath.family.familyBackground !== ''
    ) {
      fam = doc.splitTextToSize(lifepath.family.familyBackground, 190);
    }
    let famHt = ht * 2;
    for (let i = 0; i < 4; i++) {
      if (fam[i]) {
        doc.text(fam[i].trim(), left + 5, line + 4);
      }
      line += ht;
      famHt += ht;
    }
    doc.rect(left, startLine, 200, famHt, 'S');

    startLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');
    doc.rect(left, line, 25, recth, 'FD');
    doc.setTextColor('white');
    doc.text('# Siblings', left + 2, line + 4);
    doc.setTextColor('black');
    doc.setFont(this._font, 'normal');
    const bro = lifepath.family.siblings.getBrothersCount().toString();
    const sis = lifepath.family.siblings.getSistersCount().toString();
    doc.text(`${bro} brothers   ${sis} sisters`, left + 27, line + 4);
    line += ht + 3;
    const sibIndex = Math.ceil(lifepath.family.siblings.siblings.length / 2);
    const sibOne = lifepath.family.siblings.siblings.slice(0, sibIndex);
    const sibTwo = lifepath.family.siblings.siblings.slice(sibIndex);
    secondLine = line;
    let sibHt = ht + 3;
    sibOne.forEach((sib) => {
      doc.text(
        `${sib.name ? sib.name : ''} ${sib.age} ${sib.feeling}`,
        left + 5,
        line
      );
      line += ht;
      sibHt += ht;
    });
    sibTwo.forEach((sib) => {
      doc.text(
        `${sib.name ? sib.name : ''} ${sib.age} ${sib.feeling}`,
        this._midPage + 5,
        secondLine
      );
      secondLine += ht;
    });
    doc.rect(left, startLine, 200, sibHt, 'S');

    // Life Events
    doc.rect(left, line, 200, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Life Events', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht;

    doc.setFontSize(8);
    doc.setFont(this._font, 'normal');
    doc.setTextColor('black');
    doc.rect(left, line, 10, recth, 'S');
    doc.text('YEAR', left + 1, line + 5);
    doc.rect(left + 10, line, 190, recth, 'S');
    doc.text('EVENT', left + 12, line + 5);
    line += ht;
    line = this.printLifeEvents(doc, lifepath.events, left, line, ht);
    doc.setFont(this._font, 'normal');
  }

  private printLifeEvents(
    doc: jsPDF,
    events: Array<LifepathEvent>,
    left: number,
    line: number,
    ht: number
  ): number {
    const recth = 6;
    events.forEach((e) => {
      if (e.event && e.event.trim() !== '') {
        const details: Array<string> = doc.splitTextToSize(e.event, 185);

        if (line + details.length * 5 > this._pageHeight) {
          doc.addPage();
          line = this._top;
        }
        const h = recth * details.length + 1;
        doc.rect(left, line, 10, h, 'S');
        doc.text(e.age ? e.age.toString() : '', left + 1, line + 5);
        doc.rect(left + 10, line, 190, h, 'S');
        let lineHt = line - 1;
        details.forEach((d) => {
          doc.text(d.trim(), left + 11, lineHt + 5);
          lineHt += 5;
        });
        line += h;
      } else {
        doc.rect(left, line, 10, recth, 'S');
        doc.text(e.age ? e.age.toString() : '', left + 1, line + 5);
        doc.rect(left + 10, line, 190, recth, 'S');
        doc.text('', left + 11, line + 5);
        line += ht;
      }
      if (line > this._pageHeight) {
        doc.addPage();
        line = this._top;
      }
    });
    return line;
  }

  private addLifeStyle(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number
  ): number {
    const ht = 6.5;
    const recth = 6;
    let startLine = line;
    let secondLine = line;
    doc.setFont(this._font, 'bold');
    doc.setFillColor('black');

    // Money
    line = this.addMoney(doc, lifestyle, left, line, ht, recth);
    line = this.addHousing(doc, lifestyle, left, line, ht, recth);
    line = this.addServices(doc, lifestyle, left, line, ht, recth);
    line = this.addGroceries(doc, lifestyle, left, line, ht, recth);
    line = this.addIdenties(doc, lifestyle, left, line, ht, recth);
    return line + 12;
  }

  private addMoney(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    doc.rect(left, line, 20, recth, 'FD');
    doc.rect(left, line, 200, recth + ht * 2, 'S');
    doc.setTextColor('white');
    doc.text('Money', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht * 2;

    const totalCred = lifestyle.credchips.reduce((a, b) => a + b.amount, 0);
    const totalMoney = lifestyle.cash + totalCred;
    doc.text(`Total: ${totalMoney}eb`, left + 4, line);
    doc.text(
      `Credchips(${lifestyle.credchips.length}): ${totalCred}eb`,
      left + 40,
      line
    );
    doc.text(`Cash: ${lifestyle.cash}eb`, this._midPage, line);
    doc.text(`Salary: ${lifestyle.salary}eb`, this._midPage + 40, line);
    doc.text(`debt: ${lifestyle.debt}eb`, this._midPage + 70, line);
    line += ht;
    return line;
  }

  private addHousing(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');

    doc.setTextColor('white');
    doc.text('Housing', left + 2, line + 4);
    doc.setTextColor('black');
    let totalMonthlyCost = lifestyle.housing.reduce(
      (a, b) => a + b.cost * b.qualityMod * b.rooms,
      0
    );
    lifestyle.housing.forEach((housing) => {
      totalMonthlyCost += housing.utilities.reduce(
        (a, b) => a + b.cost * b.count,
        0
      );
    });
    doc.text(
      `Monthly Cost: ${totalMonthlyCost}eb`,
      this._midPage + 65,
      line + 4
    );
    line += ht * 2;

    // add each housing
    let housingRect = recth;
    lifestyle.housing.forEach((housing) => {
      const result = this.printHousing(doc, housing, left + 2, line);
      line = result.line;
      housingRect += result.recth;
    });
    doc.setTextColor('black');
    doc.rect(left, startLine, 200, line - startLine, 'S');

    return line;
  }

  private printHousing(
    doc: jsPDF,
    housing: CpHousing,
    left: number,
    line: number
  ): { line: number; recth: number } {
    const ht = 6;
    let recth = ht;
    const type = housing.cost === 200 ? 'Apt./Condo' : 'House';
    let cost = housing.utilities.reduce((a, b) => a + b.cost * b.count, 0);
    cost += housing.rooms * housing.cost * housing.qualityMod;
    let zone = '';
    switch (housing.qualityMod) {
      case 2:
        zone = 'Moderate';
        break;
      case 4:
        zone = 'Corporate';
        break;
      case 6:
        zone = 'Executive';
        break;
      default:
        zone = 'Combat';
    }
    doc.text(
      `${housing.name} - ${housing.rooms} room ${type} in ${zone} Zone - ${cost}eb/month`,
      left,
      line
    );
    line += ht;
    recth += ht;
    doc.text(`Loation: ${housing.location}`, left + 3, line);
    line += ht;
    recth += ht;
    doc.text(`Description: `, left + 3, line);
    const desc: Array<string> = doc.splitTextToSize(housing.desc, 175);
    desc.forEach((d) => {
      doc.text(d.trim(), left + 20, line);
      line += ht;
      recth += ht;
    });
    if (desc.length < 0) {
      line += ht;
      recth += ht;
    }
    doc.text(
      `Utilities: ${housing.utilities
        .map((u) => {
          if (u.count > 0) {
            return u.name;
          }
        })
        .join(' ')}`,
      left + 3,
      line
    );
    line += ht;
    recth += ht;

    doc.text(`Contents:`, left + 3, line);
    const contents = housing.contents.join(', ');
    const con: Array<string> = doc.splitTextToSize(contents, 175);
    con.forEach((d) => {
      doc.text(d.trim(), left + 20, line);
      line += ht;
      recth += ht;
    });
    if (con.length < 0) {
      line += ht;
      recth += ht;
    }
    return { line: line, recth: recth };
  }

  private addServices(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Services', left + 2, line + 4);
    doc.setTextColor('black');
    let totalMonthlyCost = lifestyle.services.reduce((a, b) => a + b.cost, 0);
    lifestyle.services.forEach((srv) => {
      if (srv.options) {
        totalMonthlyCost += srv.options.reduce(
          (a, b) => a + b.cost * b.count,
          0
        );
      }
    });
    doc.text(
      `Monthly Cost: ${totalMonthlyCost}eb`,
      this._midPage + 65,
      line + 4
    );
    line += ht * 2;
    const services = lifestyle.services.map((s) => {
      let txt = s.name;
      let cost = s.cost;
      if (s.options) {
        let opt = '';
        opt +
          s.options.map((o) => (o.count > 0 ? o.name : undefined)).join(', ');
        if (opt !== '') {
          txt += ` [${opt}]`;
        }
        cost += s.options.reduce((a, b) => a + b.cost * b.count, 0);
      }
      txt += ` (${cost}eb)`;
      return txt;
    });
    const srv: Array<string> = doc.splitTextToSize(services.join(', '), 175);
    srv.forEach((d) => {
      doc.text(d.trim(), left + 3, line);
      line += ht;
      recth += ht;
    });
    if (srv.length < 0) {
      line += ht;
      recth += ht;
    }
    doc.rect(left, startLine, 200, recth + ht, 'S');
    return line;
  }

  private addGroceries(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Groceries', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht * 2;
    const groceries = lifestyle.food.map(
      (food) =>
        `${food.count} ${food.unit}${food.count > 1 ? 's' : ''} of ${
          food.quality
        } ${food.name}`
    );
    const food: Array<string> = doc.splitTextToSize(groceries.join(', '), 175);
    food.forEach((d) => {
      doc.text(d.trim(), left + 3, line);
      line += ht;
      recth += ht;
    });
    if (food.length < 0) {
      line += ht;
      recth += ht;
    }
    doc.rect(left, startLine, 200, recth + ht, 'S');
    return line;
  }

  private addIdenties(
    doc: jsPDF,
    lifestyle: Cp2020Lifestyle,
    left: number,
    line: number,
    ht: number,
    recth: number
  ): number {
    const startLine = line;
    doc.setFillColor('black');
    doc.rect(left, line, 20, recth, 'FD');
    doc.setTextColor('white');
    doc.text('Identities', left + 2, line + 4);
    doc.setTextColor('black');
    line += ht;

    const index = Math.ceil(lifestyle.identities.length / 2);
    const colOne = lifestyle.identities.slice(0, index);
    const colTwo = lifestyle.identities.slice(index);
    this.printIdentities(doc, colTwo, this._midPage, line, ht);
    line = this.printIdentities(doc, colOne, left, line, ht);

    doc.rect(left, startLine, 200, line - startLine + ht, 'S');

    return line;
  }

  private printIdentities(
    doc: jsPDF,
    identities: Array<Cp2020Identity>,
    left: number,
    line: number,
    ht: number
  ): number {
    identities.forEach((id) => {
      doc.text(
        `${id.name} ${id.sin !== '' ? 'S.I.N.: ' + id.sin : ''}`,
        left + 2,
        line + 4
      );
      line += ht;
      const desc: Array<string> = doc.splitTextToSize(
        `Description: ${id.desc}`,
        95
      );
      desc.forEach((d) => {
        doc.text(d.trim(), left + 2, line);
        line += ht;
      });
      if (desc.length < 0) {
        line += ht;
      }
    });
    return line;
  }
}
