import { CPRedLifePathEnemy } from './c-p-red-life-path-enemy';
import { CPRedLifePathLoveaffair } from './c-p-red-life-path-loveaffair';
import { CPRedLifePathFamily } from './c-p-red-life-path-family';
import { CPRedLifePathMotivations } from './c-p-red-life-path-motivations';
import { CPRedLifePathAppearance } from './c-p-red-life-path-appearance';
import { CPRedLifePathCulture } from './c-p-red-life-path-culture';
import { CPRedLifePathCore } from './c-p-red-life-path-core';
import { jsPDF } from 'jspdf';
import { CPRedLifePathFriend } from './c-p-red-life-path-friend';
import { KeyValue } from '@angular/common';

export class PDFCPRedLifePathCore {

  static creatdPDF(doc: jsPDF, lifepath: CPRedLifePathCore, leftMargin: number, top: number, lineheight: number, pageHeight: number, pageWidth: number, font: string, fontsize: number ): jsPDF {
    this.createLifePathFullPage(doc, lifepath, leftMargin, top, lineheight, pageHeight, pageWidth, font, fontsize );
    return doc;
  }
  /**
   * This function will create a box in the style of CP Red, clipping the two corners.
   *
   * @private
   * @param {jsPDF} doc
   * @param {string} style - Fill style. Use 'FD' by default (fill then stroke). Also avaliable 'F' and 'S'
   * @param {number} top - the y coordiante to place the box
   * @param {number} left - the x coordinate to place the box
   * @param {number} height - height of the box
   * @param {number} width - width of the box
   * @param {number} triangleSide - the size of the clipping on corners.
   * @param {string} color - the color to fill the box, 'red'
   * @memberof CPRedCharacterPDFService
   */
  private static createBackgroundBox(doc: jsPDF, style: string,
    top: number, left: number,
    height: number, width: number,
    triangleSide: number, color: string
  ) {
    const acc = [];
    acc.push([0, 0]);
    acc.push([(width - triangleSide), 0]);
    acc.push([triangleSide, triangleSide]);
    acc.push([0, (height - triangleSide)]);
    acc.push([(triangleSide - width), 0]);
    acc.push([-triangleSide, -triangleSide]);

    doc.setFillColor(color);
    doc.setDrawColor(color);
    doc.lines(acc, left, top, [1, 1], style, true);
  }

  private static createLifePathFullPage(doc: jsPDF, lifePath: CPRedLifePathCore, leftMargin: number, top: number, lineheight: number, pageHeight: number, pageWidth: number, font: string, fontsize: number ) {
    let line = top;
    let left = leftMargin;
    this.createBackgroundBox(doc, 'FD', line, left, pageHeight, pageWidth, 10, 'red');
    // Background
    line += 10;
    left += 5;

    // Culture
    line = this.createCultureSection(doc, 'CULTURE', lifePath.culture, line, lineheight, left, font, fontsize);

    line = this.createAppearanceSection(doc, lifePath.appearance , line, lineheight, left, font, fontsize);
    // Motivation
    line = this.createMotivationSection(doc, lifePath.motivations, line, lineheight, left, font, fontsize);
    // Family
    line = this.createFamilySection(doc, lifePath.family, line, lineheight, left, font, fontsize);

    // Friends
    line = this.createFriendsSection(doc,  lifePath.friends, line - 3, lineheight, left, font, fontsize);

    // Romance
    line = this.createRomancesSection(doc, lifePath.loveAffairs, line -3, lineheight, left, font, fontsize);

    // Enemies
    line = this.createEnemiesSection(doc, lifePath.enemies, line - 3, lineheight, left, font, fontsize);

    // Role
    line = this.createRoleSection(doc, lifePath.role, line - 17, lineheight, left, font, fontsize);
  }

  private static createCultureSection(doc: jsPDF, title: string, culture: CPRedLifePathCulture, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    doc.setFont(font, 'bold');
    doc.setFontSize(fontSize + 3);
    doc.setTextColor('white');
    doc.text(title, left, line + 2, {baseline: 'middle'});
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.roundedRect(left + 35, line - 2, 50, lineHeight + 2, 2, 2, 'F');
    doc.roundedRect(left + 90, line - 2, 50, lineHeight + 2, 2, 2, 'F');
    doc.setTextColor(200,200,200);
    doc.setFontSize(fontSize - 4);
    doc.text('Region', left + 36, line - 1, {baseline: 'top'} );
    doc.text('Language', left + 91,  line - 1, {baseline: 'top'} );
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 1);
    doc.text(culture.name, left + 39, line + 2, {baseline: 'top'} );
    doc.text(culture.language, left + 94, line + 2, {baseline: 'top'} );
    doc.setFontSize(fontSize);
    return line + lineHeight + 5;
  }

  private static createAppearanceSection(doc: jsPDF, appearance: CPRedLifePathAppearance, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    const height = lineHeight * 2;
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.roundedRect(left, line - 2, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 65, line - 2, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 130, line - 2, 63, height, 2, 2, 'F');
    doc.setTextColor(200,200,200);
    doc.setFontSize(fontSize - 4);
    doc.text('Hairstyle', left + 1, line - 1, {baseline: 'top'} );
    doc.text('Clothing', left + 66,  line - 1, {baseline: 'top'} );
    doc.text('Affectations', left + 131,  line - 1, {baseline: 'top'} );
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 2);
    this.createBox(doc, appearance.hairstyle, left + 2, line + 2, 58, fontSize, height);
    this.createBox(doc, appearance.clothing, left + 67, line + 2, 58, fontSize, height);
    this.createBox(doc, appearance.affectations, left + 132, line + 2, 58, fontSize, height);
    doc.setFontSize(fontSize);
    return line + height - 1;
  }

  private static createMotivationSection(doc: jsPDF, motivations: CPRedLifePathMotivations, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    let height = lineHeight * 2;
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.roundedRect(left, line, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 65, line, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 130, line, 63, height, 2, 2, 'F');
    // first row
    doc.setTextColor(200,200,200);
    doc.setFontSize(fontSize - 4);
    line += 1;
    doc.text('Personality', left + 1, line, {baseline: 'top'} );
    doc.text('Value Most', left + 66,  line, {baseline: 'top'} );
    doc.text('Valued Possession', left + 131,  line, {baseline: 'top'} );
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 2);
    line += 3;
    this.createBox(doc, motivations.personality, left + 2, line, 58, 5, height);
    this.createBox(doc, motivations.valueMost, left + 67, line, 58, 5, height);
    this.createBox(doc, motivations.valuedPossession, left + 132, line, 58, 5, height);
    // second row
    line += height - 2;
    height = lineHeight * 3;
    doc.setFillColor('white');
    doc.roundedRect(left, line, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 65, line, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 130, line, 63, height, 2, 2, 'F');
    doc.setTextColor(200,200,200);
    doc.setFontSize(fontSize - 4);
    line += 1;
    doc.text('Valued Person', left + 1, line, {baseline: 'top'} );
    doc.text('Feel About People', left + 66,  line, {baseline: 'top'} );
    doc.text('Goal', left + 131,  line, {baseline: 'top'} );
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 2);
    line += 3;
    this.createBox(doc, motivations.valuedPerson, left + 2, line, 58, 5, height);
    this.createBox(doc, motivations.feelAboutPeople, left + 67, line, 58, 5, height);
    this.createBox(doc, motivations.goal, left + 132, line, 58, 5, height);
    doc.setFontSize(fontSize);
    return line + height - 2;
  }

  private static createFamilySection(doc: jsPDF, family: CPRedLifePathFamily, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    let height = lineHeight * 3;
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.roundedRect(left, line, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 65, line, 63, height, 2, 2, 'F');
    doc.roundedRect(left + 130, line, 63, height, 2, 2, 'F');
    // first row
    doc.setTextColor(200,200,200);
    doc.setFontSize(fontSize - 4);
    line += 1;
    doc.text('Family Background', left + 1, line, {baseline: 'top'} );
    doc.text('Childhood Enviro.', left + 66,  line, {baseline: 'top'} );
    doc.text('Family Crisis', left + 131,  line, {baseline: 'top'} );
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 2);
    line += 3;
    this.createBox(doc, family.background, left + 2, line, 58, 4.5, height);
    this.createBox(doc, family.childhoodEnvironment, left + 67, line, 58, 4.5, height);
    this.createBox(doc, family.familyCrisis, left + 132, line, 58, 4.5, height);

    doc.setFontSize(fontSize);
    return line + height - 2;
  }

  private static createFriendsSection(doc: jsPDF, friends: Array<CPRedLifePathFriend>, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    doc.setFont(font, 'bold');
    doc.setFontSize(fontSize + 3);
    doc.setTextColor('white');
    doc.text(`FRIENDS (${friends.length})`, left, line + 6, {baseline: 'middle'});
    line += fontSize - 2;
    let height = lineHeight * 2.5;
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.roundedRect(left, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 48, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 96, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 144, line, 46, height, 2, 2, 'F');
    // first row
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 2);
    line += 2;
    let col = left;
    friends.forEach( friend => {
      this.createBox(doc, friend.who, col + 2, line, 45, 5, height);
      col += 48;
    });

    doc.setFontSize(fontSize);
    return line + height;
  }

  private static createRomancesSection(doc: jsPDF, lovers: Array<CPRedLifePathLoveaffair>, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    doc.setFont(font, 'bold');
    doc.setFontSize(fontSize + 3);
    doc.setTextColor('white');
    doc.text(`TRAGIC LOVE AFFAIRS (${lovers.length})`, left, line + 6, {baseline: 'middle'});
    line += fontSize - 2;
    let height = lineHeight *  2.5;
    doc.setFillColor('white');
    doc.setFont(font, 'normal');
    doc.roundedRect(left, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 48, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 96, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 144, line, 46, height, 2, 2, 'F');
    // first row
    doc.setTextColor(0,0,0);
    doc.setFontSize(fontSize - 2);
    line += 2;
    let col = left;
    lovers.forEach( lover => {
      this.createBox(doc, lover.kind, col + 2, line, 45, 5, height);
      col += 48;
    });

    doc.setFontSize(fontSize);
    return line + height;
  }

  private static createEnemiesSection(doc: jsPDF, enemies: Array<CPRedLifePathEnemy>, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    doc.setFont(font, 'bold');
    doc.setFontSize(fontSize + 3);
    doc.setTextColor('white');
    doc.text(`ENEMIES (${enemies.length})`, left, line + 6, {baseline: 'middle'});
    line += fontSize - 2;
    let height = lineHeight * 2.5;
    doc.setFont(font, 'normal');
    let enemy = enemies.length > 0 ? enemies[0] : undefined;
    line = this.createEnemyBox(doc, enemy, left, line, height, fontSize);
    enemy = enemies.length > 1 ? enemies[1] : undefined;
    line = this.createEnemyBox(doc, enemy, left, line, height, fontSize);
    enemy = enemies.length > 2 ? enemies[2] : undefined;
    line = this.createEnemyBox(doc, enemy, left, line, height, fontSize);
    enemy = enemies.length > 3 ? enemies[3] : undefined;
    line = this.createEnemyBox(doc, enemy, left, line, height, fontSize);

    doc.setFontSize(fontSize);
    return line + height;
  }

  private static createRoleSection(doc: jsPDF, role: Array<KeyValue<string, string>>, line: number, lineHeight: number, left: number, font: string,fontSize: number): number {
    doc.setFont(font, 'bold');
    doc.setFontSize(fontSize + 3);
    doc.setTextColor('white');
    doc.text(`ROLE LIFEPATH`, left, line, {baseline: 'middle'});
    line += fontSize - 4.5;
    let height = lineHeight * 2.5;
    let leftMargin = left;
    doc.setFont(font, 'normal');
     role.forEach( (r, i) => {
      doc.setFillColor('white');
      doc.setFont(font, 'normal');
      doc.roundedRect(leftMargin, line, 63, height, 2, 2, 'F');
      doc.setTextColor(200,200,200);
      doc.setFontSize(fontSize - 4);
      doc.text(r.key, leftMargin + 2, line + 1, {baseline: 'top'});
      doc.setTextColor(0,0,0);
      doc.setFontSize(fontSize - 2);
      this.createBox(doc, r.value, leftMargin + 3, line + 3, 60, 4.5, height);

      if (i%3 === 2) {
        leftMargin = left;
        line += height + 1;
      } else {
        leftMargin += 65;
      }
    });
    return line;
  }

  private static createEnemyBox(doc: jsPDF, enemy: CPRedLifePathEnemy,left: number, line: number, height: number, fontSize: number): number{
    doc.setFillColor('white');
    doc.roundedRect(left, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 48, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 96, line, 46, height, 2, 2, 'F');
    doc.roundedRect(left + 144, line, 46, height, 2, 2, 'F');
    doc.setTextColor(200,200,200);
    doc.setFontSize(fontSize - 4);
    line += 1;
    doc.text('Who', left + 1, line, {baseline: 'top'} );
    doc.text('Reason', left + 49,  line, {baseline: 'top'} );
    doc.text('Resources', left + 97,  line, {baseline: 'top'} );
    doc.text('Reaction', left + 145,  line, {baseline: 'top'} );
    line += 3;
    if( enemy){
      doc.setTextColor(0,0,0);
      doc.setFontSize(fontSize - 2);
      this.createBox(doc, enemy.who, left + 2, line, 42, 5, height);
      this.createBox(doc, enemy.cause, left + 50, line, 42, 5, height);
      this.createBox(doc, enemy.resources, left + 98, line, 42, 5, height);
      this.createBox(doc, enemy.reaction, left + 146, line, 42, 5, height);
    }
    return line + height;
  }

  private static createBox(doc: jsPDF, text: string, left: number, line: number,width: number, lineSize: number, maxHeight: number): number {
    const textArray: Array<string> = doc.splitTextToSize(text, width);
    let currLine = line;
    textArray.forEach( txt => {
      doc.text(txt, left, currLine, {baseline: 'top'} );
      currLine += lineSize;
      if (currLine > maxHeight) {
        return;
      }
    });
    return line + (textArray.length * lineSize);
  }

}
