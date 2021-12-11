import { CMBT_ZONE_EVENT_TIME } from './../../shared/models/cmbtzone/cmb-zone-event-time';
import { CmbtZoneEventService } from './../../shared/services/cmbt-zone/cmbt-zone-event.service';
import { CmbtZoneToPDF } from './../../shared/models/pdf/cmbt-zone-to-pdf';
import { CmbtZoneBlockService } from './../../shared/services/cmbt-zone/cmbt-zone-block.service';
import { CmbtZoneBuildingService } from './../../shared/services/cmbt-zone/cmbt-zone-building.service';
import { CmbtZoneStreetObjectService } from '../../shared/services/cmbt-zone/cmbt-zone-street-object.service';
import { faDice, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CmbtZoneBlock, CmbtZonePath, CmbtZoneBuilding, CmbtZoneBuildingType } from './../../shared/models/cmbtzone/cmbt-zone-block';
import { Coord } from './../../app-netrun/models';
import { CmbtZoneEvent } from './../../shared/models/cmbtzone/cmbt-zone-event';

@Component({
  selector: 'cs-cmbt-zone-map',
  templateUrl: './cmbt-zone-map.component.html',
  styleUrls: ['./cmbt-zone-map.component.css']
})
export class CmbtZoneMapComponent implements OnInit {
  faDice = faDice;
  faFilePdf = faFilePdf;

  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  buildings: Array<Array<string>> = new Array<Array<string>>();
  streetObjects: Array<string> = new Array<string>();
  streetEvents: Array<CmbtZoneEvent> = new Array<CmbtZoneEvent>();
  streetEventTime: CMBT_ZONE_EVENT_TIME = CMBT_ZONE_EVENT_TIME.daytime;
  streetEventCount = 1;

  blocks: Array<Coord> = new Array<Coord>();
  blockLayouts: Array<CmbtZoneBlock> = new Array<CmbtZoneBlock>();

  @ViewChild('cmbtZoneMapSVG')
  cmbtZoneMapSVG: ElementRef;

  constructor(private diceService: DiceService,
    private objectService: CmbtZoneStreetObjectService,
    private buildingService: CmbtZoneBuildingService,
    private blockService: CmbtZoneBlockService,
    private eventService: CmbtZoneEventService
  ) { }

  ngOnInit(): void {
    this.blocks = [
      { x: 0  , y: 0   },
      { x: 200, y: 0   },
      { x: 400, y: 0   },
      { x: 0  , y: 200 },
      { x: 200, y: 200 },
      { x: 400, y: 200 },
      { x: 0  , y: 400 },
      { x: 200, y: 400 },
      { x: 400, y: 400 },
      { x: 0  , y: 600 },
      { x: 200, y: 600 },
      { x: 400, y: 600 }
    ];
  }

  getPath(path: CmbtZoneBuilding): string {
    const pointOrigin = `${path.x} ${path.y}`;
    const pointBottomLeft = `${path.x} ${path.y + path.ht}`;
    const pointBottomRight = `${path.x + path.wd} ${path.y + path.ht}`;
    const pointBottomRightOffset = `${path.x + path.wd + path.stories} ${path.y + path.ht - path.stories}`;
    const pointTopRightOffset = `${path.x + path.wd + path.stories} ${path.y - path.stories}`;
    const pointTopLeftOffset = `${path.x + path.stories} ${path.y - path.stories}`;
    const outline = `${path.x + path.stories} ${path.y + path.ht - path.stories}`;
    const result = `M${pointOrigin} L${pointBottomLeft} L${pointBottomRight} L${pointBottomRightOffset} L${pointTopRightOffset} L${pointTopLeftOffset} Z
                    M${pointTopLeftOffset} L${outline} L${pointBottomRightOffset}
                    M${outline} L${pointBottomLeft} Z`;
    return result;
  }

  getTextX(path: CmbtZoneBuilding): number {
    let x = path.x + path.wd + path.stories - 6;
    return x;
  }
  getTextY(path: CmbtZoneBuilding): number {
    let y = path.y - path.stories + 10;
    return y;
  }

  rollBuildings() {
    this.blockLayouts = new Array<CmbtZoneBlock>();
    this.blockService.createBlock(this.diceService, 12)
      .subscribe(data => {
        this.blockLayouts = data;
        const numOfBuildings = this.blockLayouts.reduce((a, b) => a + b.numOfBuildings, 0);
        this.buildingService.createBuildings(numOfBuildings, this.diceService)
          .subscribe(list => {
            const listLength = list.length;
            this.buildings = new Array<Array<string>>();
            this.blockLayouts.forEach( block => {
              this.buildings.push(list.splice(0, block.numOfBuildings));
            });
          });
      });
  }

  rollStreetObjects() {
    const numOfObjects = this.diceService.rollMoreDice('2d10').total;
    this.streetObjects = new Array<string>();
    this.objectService
      .createTrash(numOfObjects, this.diceService)
      .subscribe(list => {
        this.streetObjects = list;
      });
  }

  rollStreetEvents() {
    if (this.streetEventCount < 2) {
        this.eventService.createEvent(this.diceService, this.streetEventTime)
        .subscribe( event => {
        this.streetEvents.push(event);
        });
    } else {
      this.eventService.createEvents(this.streetEventCount, this.diceService, this.streetEventTime)
      .subscribe( events => {
        this.streetEvents = events;
      });
    }
  }

  printPDF() {
      const pdf: CmbtZoneToPDF = new CmbtZoneToPDF();
      pdf.generatePdf(this.blocks, this.blockLayouts, this.buildings);
  }


}
