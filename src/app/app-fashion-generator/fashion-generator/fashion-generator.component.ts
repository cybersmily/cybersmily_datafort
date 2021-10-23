import { SeoService } from './../../shared/services/seo/seo.service';

import { SaveFileService } from './../../shared/services/file-services';
import { DataService } from './../../shared/services/file-services';
import { Cp2020ArmorPiece, ArmorAttributeLists } from '../../shared/cp2020/cp2020-armor/models';
import { Component, OnInit } from '@angular/core';
import { faFile, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-fashion-generator',
  templateUrl: './fashion-generator.component.html',
  styleUrls: ['./fashion-generator.component.css']
})
export class FashionGeneratorComponent implements OnInit {
  faFile = faFile;
  faSave = faSave;
  clothingList: Cp2020ArmorPiece[];
  clothingTotal: number;

  clothingData: ArmorAttributeLists;
  constructor(private dataService: DataService,
    private saveFileService: SaveFileService,
    private seo: SeoService) {
    // create dumby object while waiting for the real data to load.
    this.clothingData = {
      clothes: new Array(),
      styles: new Array(),
      qualities: new Array(),
      armorChart: new Array(),
      options: new Array()
    };
  }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Fashion Calculator',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Fashion Calculator is an application to generate a character clothes using the Chromebook 3 supplement.'
    );
    this.clothingList = new Array();
    this.getClothingData();
    this.clothingTotal = 0;
  }

  /**
   * Get the clothing data from the json file or from local storage.
   * @memberof FashionGeneratorComponent
   */
  getClothingData() {
    /*
    this.dataService.GetAppDataClothes()
      .subscribe(
        resultObj => {
          this.parseClothingData(resultObj);
        },
        error => console.log('Error :: ' + error)
      );
      */
  }
  /**
   * parse the option data
   * @param {any} data - data to be parsed.
   * @memberof FashionGeneratorComponent
   */
  parseClothingData(data: ArmorAttributeLists) {
    this.clothingData = data;
    this.clothingData.clothes.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * addToList will add a Clothing to the clothingList
   * and then pass it to the list componenent to display.
   * @param {Clothing} event - Clothing objec to add to list.
   * @memberof FashionGeneratorComponent
   */
  addToList(event: Cp2020ArmorPiece) {
    this.clothingList.push(event);
    this.clothingTotal += Number(event.cost);
  }

   /**
   * Save the current list of clothing to a text file.
   *
   * @memberof FashionGeneratorComponent
   */
  saveList() {
    if (!this.isListEmpty) {
      let output = '';
      this.clothingList.forEach((item, index) => {
        output += item.quality.name + ' ';
        output += item.style.name + ' ';
        if (item.isLeather) {
          output += 'leather ';
        }
        output += item.clothes.name;
        if (item.options.length > 0) {
          output += '[';
          item.options.forEach((opt, ind) => {
            output += opt.name;
            if (ind < item.options.length - 1) {
              output += '|';
            }
          });
          output += ']';
        }
        output += ' - ' + item.cost.toLocaleString() + 'eb';
        output += '\r\n';
      });
      output += 'TOTAL COST: ' + this.clothingTotal.toLocaleString() + 'eb';
      this.saveFileService.SaveAsFile('CP2020FashionList', output);
    }
  }

  get isListEmpty(): boolean {
    return this.clothingList.length < 1;
  }
}
