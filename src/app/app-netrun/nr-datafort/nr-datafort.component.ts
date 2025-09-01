import { DiceService } from './../../shared/services/dice/dice.service';
import { NR_TRACE_SUCCESS, MAP_TYPE, NR_DATAFORT_SPACE, NR_DATAFORT_SOLARPANEL, NR_SPACE_NAME} from '../models/nr-constants';
import { NrTrackerService, NrMapDataService, NrMapGridService } from '../services';
import { Component, OnInit, Input, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { NRDataFort } from '../models';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
    selector: 'cs-nr-datafort',
    templateUrl: './nr-datafort.component.html',
    styleUrls: ['./nr-datafort.component.css'],
    standalone: false
})
export class NrDatafortComponent implements OnInit {
  @Input()
  dataFort: NRDataFort;

  @Input()
  row: number;
  @Input()
  column: number;

  @ViewChild('pop', {static: false}) pop: PopoverDirective;

  @HostBinding('style.top') top: string;
  @HostBinding('style.left') left: string;
  @HostBinding('style.display') display: string;

  textClass = {
    csdDatafortText: true,
    leftText: false,
    rightText: false
  };

  iconClass = {
    csdDatafortIcon: true,
    city: false,
    df_pvt: false,
    df_bbs: false,
    df_pbc: false,
    df_ldl: false,
    df_lv1: false,
    df_lv2: false,
    df_lv3: false,
    df_blk: false
  };

  showLinks = {
    hack: true,
    world: false,
    region: false,
    city: false,
    space: false
  };

  datafortInfo: any;
  mapType: string;
  ttPlacement = 'top';
  popPlacement = 'bottom';

  constructor(
    private nrMapDataService: NrMapDataService,
    private nrTrackerService: NrTrackerService,
    private diceRollService: DiceService) { }

  ngOnInit() {
    this.mapType = this.nrMapDataService.getCurrRegionType();


    this.showLinks.hack = true;

    this.iconClass[this.dataFort.img] = true;
    const ldl = (this.dataFort.img === 'df_ldl') ? this.nrMapDataService.getCurrRegionName() : this.dataFort.name;
    this.datafortInfo = this.nrMapDataService.cityList.GetCity(ldl);
    if (!this.datafortInfo) {
      this.datafortInfo = {};
      this.datafortInfo['name'] = this.dataFort.name;
      this.datafortInfo['hasSysop'] = (this.diceRollService.generateNumber(0, 1) === 1) ? true : false;
      this.datafortInfo['hasAI'] = (this.diceRollService.generateNumber(0, 1) === 1) ? true : false;
      this.datafortInfo['diff'] = this.nrTrackerService.getDiff(this.dataFort.img, this.datafortInfo.hasSysop, this.datafortInfo.hasAI);
    }

    this.mapType = this.nrMapDataService.getCurrRegionType();

    // check to see if the LDL has been hacked before.
    this.nrTrackerService.TraceList.subscribe(list => {
      if (list.length > 0) {
        const city = list[list.length - 1].city;
        if (this.dataFort.name === city) {
          this.dataFort.hacked = true;
        }
      }
    });

    this.setAlignment();
    this.setLinks();
  }


  /**
   * Set the datafort elemtn alignment
   *
   * @memberof NrDatafortComponent
   */
  setAlignment() {
    if ( this.mapType !== 'c' )  {
      this.left = (this.dataFort.left) ? this.dataFort.left + 'px' : 'inherited';
      this.top = (this.dataFort.top) ? this.dataFort.top + 'px' : 'inherited';
    }

    if (this.dataFort.align) {
      this.textClass.rightText = (this.dataFort.align === 'r');
      this.textClass.leftText = (this.dataFort.align === 'l');
    }

    if (this.dataFort.align) {
      switch (this.dataFort.align ) {
        case 'r':
          this.ttPlacement = 'right';
          this.popPlacement = 'auto';
          break;
        case 'l':
          this.ttPlacement = 'right';
          this.popPlacement = 'auto';
          break;
        case 'b':
          this.ttPlacement = 'bottom';
          this.popPlacement = 'auto';
          break;
        default:
          this.ttPlacement = 'top';
          this.popPlacement = 'auto';
      }
    }
  }


  /**
   * get the datafort image link
   *
   * @returns
   * @memberof NrDatafortComponent
   */
  imageSrc() {
    return '/img/apps/nricons/' + this.dataFort.img + '.png';
  }


  /**
   * hackDataFort
   * This will calle the tracker service to hack the datefort.
   * If successful it will set the links available.
   * If failed, an alert will show the results.
   *
   * @returns
   * @memberof NrDatafortComponent
   */
  hackDatafort() {
    // log trace value
    const results = this.nrTrackerService.hackLDL(this.datafortInfo);
    if (results.result === NR_TRACE_SUCCESS) {
      this.dataFort.hacked = results.succeed;
      this.showLinks.hack = false;
      this.setLinks();
    } else {
      // display the results.
      alert(results.result);
      if (results.dump) {
        // restart from beginning.
      }
      return;
    }
  }


  /**
   * setLinks
   * This method will set what hack buttons will appear in the
   * popup.
   *
   * @memberof NrDatafortComponent
   */
  setLinks() {
    if (this.dataFort.hacked
      && ( this.dataFort.img === 'df_ldl' || this.dataFort.img === 'city'
        || this.dataFort.img === 'stat'
        || this.dataFort.img === 'lunar'
        || this.dataFort.img === 'geo')) {
      // show other ldl links
      this.showLinks.world = this.mapType !== 'w' && this.datafortInfo.world;
      this.showLinks.city = this.mapType !== 'c' && this.datafortInfo.map;
      this.showLinks.region = this.mapType !== 'r' && this.mapType !== 's';
      this.showLinks.space = this.mapType === 'w';
    } else {
      this.showLinks.world = false;
      this.showLinks.city = false;
      this.showLinks.region = false;
      this.showLinks.space = false;
    }
  }


  /**
   * goToRegion
   * Navigates to the new region map.
   * @memberof NrDatafortComponent
   */
  goToRegion() {
    // TODO: set the LDL cell on map.
    this.nrMapDataService.goToRegion(this.datafortInfo.region, this.datafortInfo.name);
  }

  /**
   * goToCity
   * Navigates to the new city map
   * @memberof NrDatafortComponent
   */
  goToCity() {
    this.nrMapDataService.goToCity(this.datafortInfo.name, this.datafortInfo.name);
  }


  /**
   * goToWorld
   * Navigates to the world map.
   * @memberof NrDatafortComponent
   */
  goToWorld() {
    this.nrMapDataService.goToWorld(this.datafortInfo.name, this.datafortInfo.name);
  }

  goToSpace() {
    this.nrMapDataService.goToRegion(NR_SPACE_NAME, 'WorldSat Network (GEO)');
  }


  /**
   * onClick
   * Default click action. this will show the popup info for the user
   * to read the datafort info and hack into it.
   *
   * @param {MouseEvent} event
   * @memberof NrDatafortComponent
   */
  onClick(event: MouseEvent) {
    // do nothing if it is a SPACE cell.
    if ( this.dataFort.img !== NR_DATAFORT_SPACE && this.dataFort.img !== NR_DATAFORT_SOLARPANEL) {
      this.showLinks.hack = (this.nrMapDataService.isSelected(this.row, this.column)
                          && !this.dataFort.hacked && this.datafortInfo.security);
      if ( this.datafortInfo) {
        this.pop.show();
      }
    }
  }


  /**
   * Hover event
   * hides display
   * @param {MouseEvent} event
   * @memberof NrDatafortComponent
   */
  onOver(event: MouseEvent) {
    this.display = 'none';
    this.display = 'block';
  }


  /**
   * hide
   * Hides the datafort info popup.
   * @memberof NrDatafortComponent
   */
  hide() {
    this.pop.hide();
  }
}
