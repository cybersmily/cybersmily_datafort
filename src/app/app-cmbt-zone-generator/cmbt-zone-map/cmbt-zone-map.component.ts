import { CMBT_ZONE_EVENT_TIME } from './../../shared/models/cmbtzone/cmb-zone-event-time';
import { CmbtZoneEventService } from './../../shared/services/cmbt-zone/cmbt-zone-event.service';
import { CmbtZoneToPDF } from './../../shared/models/pdf/cmbt-zone-to-pdf';
import { CmbtZoneBlockService } from './../../shared/services/cmbt-zone/cmbt-zone-block.service';
import { CmbtZoneBuildingService } from './../../shared/services/cmbt-zone/cmbt-zone-building.service';
import { CmbtZoneStreetObjectService } from '../../shared/services/cmbt-zone/cmbt-zone-street-object.service';
import { faDice, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CmbtZoneBlock, CmbtZonePath } from './../../shared/models/cmbtzone/cmbt-zone-block';
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

  getPath(path: CmbtZonePath, coord: Coord): string {
    const result = `M ${path.x + coord.x} ${ path.y + coord.y} ${path.d} z`;
    return result;
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
