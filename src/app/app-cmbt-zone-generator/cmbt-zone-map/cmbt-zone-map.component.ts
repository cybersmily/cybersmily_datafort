import { CmbtZoneBlockService } from './../../shared/services/cmbt-zone/cmbt-zone-block.service';
import { CmbtZoneBuildingService } from './../../shared/services/cmbt-zone/cmbt-zone-building.service';
import { CmbtZoneStreetObjectService } from '../../shared/services/cmbt-zone/cmbt-zone-street-object.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit } from '@angular/core';
import { CmbtZoneBlock } from './../../shared/models/cmbtzone/cmbt-zone-block';
import { Coord } from './../../app-netrun/models';

@Component({
  selector: 'cs-cmbt-zone-map',
  templateUrl: './cmbt-zone-map.component.html',
  styleUrls: ['./cmbt-zone-map.component.css']
})
export class CmbtZoneMapComponent implements OnInit {
  faDice = faDice;

  numOfBuildings = 1;
  numOfStreetObjects = 1;
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  buildings: Array<Array<string>> = new Array<Array<string>>();
  streetObjects: Array<string> = new Array<string>();

  blocks: Array<Coord> = new Array<Coord>();
  blockLayouts: Array<CmbtZoneBlock> = new Array<CmbtZoneBlock>();

  constructor(private diceService: DiceService,
    private objectService: CmbtZoneStreetObjectService,
    private buildingService: CmbtZoneBuildingService,
    private blockService: CmbtZoneBlockService) { }

  ngOnInit(): void {
    this.blocks = [
      { x: 20, y: 20 },
      { x: 240, y: 20 },
      { x: 460, y: 20 },
      { x: 20, y: 240 },
      { x: 240, y: 240 },
      { x: 460, y: 240 },
      { x: 20, y: 460 },
      { x: 240, y: 460 },
      { x: 460, y: 460 },
      { x: 20, y: 680 },
      { x: 240, y: 680 },
      { x: 460, y: 680 }
    ];
  }

  rollBuildings() {
    this.blockLayouts = new Array<CmbtZoneBlock>(12);
    this.blockService.createBlock(this.diceService, 12)
      .subscribe(data => {
        this.blockLayouts = data;
        const numOfBuildings = this.blockLayouts.reduce((a, b) => a + b.numOfBuildings, 0);
        this.buildingService.createBuildings(numOfBuildings, this.diceService)
          .subscribe(list => {
            const listLength = list.length;
            this.blockLayouts.forEach( block => {
              this.buildings.push(list.splice(0, block.numOfBuildings));
            });
          });
      });
  }

  rollStreetObjects() {
    this.streetObjects = new Array<string>();
    this.objectService
      .createTrash(this.numOfStreetObjects, this.diceService)
      .subscribe(list => {
        this.streetObjects = list;
      });
  }
}
