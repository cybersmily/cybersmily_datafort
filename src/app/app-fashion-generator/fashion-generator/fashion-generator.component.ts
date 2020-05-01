
import { SaveFileService } from './../../shared/services/save-file.service';
import { DataService } from './../../shared/services/data.service';
import { Clothing, ClothingLists, PieceOfClothing, ClothingOption, ClothingArmor } from '../../shared/models/clothing';
import { Component, OnInit } from '@angular/core';
import { CS_CLOTHINGDATA_KEY } from './../../keys/storageKeys';

@Component({
  selector: 'cs-fashion-generator',
  templateUrl: './fashion-generator.component.html',
  styleUrls: ['./fashion-generator.component.css']
})
export class FashionGeneratorComponent implements OnInit {
  clothingList: Clothing[];
  clothingTotal: number;

  clothingData: ClothingLists;
  constructor(private dataService: DataService,
            private saveFileService: SaveFileService) {
    // create dumby object while waiting for the real data to load.
    this.clothingData = {
      Clothes: new Array(),
      Style: new Array(),
      Quality: new Array(),
      Armoring: new Array(),
      Options: new Array()
    };
   }

  ngOnInit() {
    this.clothingList = new Array();
    this.getClothingData();
    this.clothingTotal = 0;
  }

  /**
   * Get the clothing data from the json file or from local storage.
   * @memberof FashionGeneratorComponent
   */
  getClothingData() {
    this.dataService.GetAppDataClothes()
    .subscribe(
      resultObj => {
        this.parseClothingData(resultObj);
      },
      error => console.log( 'Error :: ' + error)
    );
  }
  /**
   * parse the option data
   * @param {any} data - data to be parsed.
   * @memberof FashionGeneratorComponent
   */
  parseClothingData( data: ClothingLists ) {
    this.clothingData = data;
    this.clothingData.Clothes.sort( (a, b) => a.name.localeCompare(b.name));
  }

  /**
   * addToList will add a Clothing to the clothingList
   * and then pass it to the list componenent to display.
   * @param {Clothing} event - Clothing objec to add to list.
   * @memberof FashionGeneratorComponent
   */
  addToList(event: Clothing) {
    this.clothingList.push(event);
    this.clothingTotal += Number(event.totalCost);
  }

  saveList() {
    let output = '';
    this.clothingList.forEach((item, index) => {
      output += item.quality.name + ' ';
      output += item.style.name + ' ';
      if (item.isLeather) {
        output += 'leather ';
      }
      output += item.clothes.name;
      if (item.spRating.sp > 0 ) {
        output += '(SP:' + item.spRating.sp + '/EV:' + item.spRating.ev + ')';
      }
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
      output += ' - ' + item.totalCost.toLocaleString() + 'eb';
      output += '\r\n';
    });
    output += 'TOTAL COST: ' + this.clothingTotal.toLocaleString() + 'eb';
    this.saveFileService.SaveAsFile('CP2020FashionList', output);
  }

  isListEmpty() {
    return this.clothingList.length < 1;
  }
}
