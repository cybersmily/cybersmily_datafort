
import {fromEvent as observableFromEvent,  Observable, Subscription } from 'rxjs';
import { NRMap, Coord } from '../models';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NrMapPositionService, NrMapDataService } from '../services';

@Component({
  selector: 'cs-nrdebug',
  templateUrl: './nrdebug.component.html',
  styleUrls: ['./nrdebug.component.css']
})
export class NrdebugComponent implements OnInit, OnDestroy {
  @Input()
  showDebug: boolean;

  showMapData = false;
  showDataForts = false;
  elem: HTMLElement;
  cellPosition: Coord;

  mouseposition: any = {};
  currMap: NRMap;
  parentOffset: any;

  activeMap: string;

  subscription: Subscription;

  constructor(
    private nrMapDataService: NrMapDataService,
    private nrPositionService: NrMapPositionService) { }

  ngOnInit() {
    this.nrMapDataService.currMap.subscribe( map => {
      this.currMap = map;
      this.activeMap = this.nrMapDataService.activemap;
    });
    this.initMouseOver();
    // subscribe to mouse movement to track which cells are being targetted
    this.nrPositionService.currPosition.subscribe( coord => {
      this.cellPosition = coord;
    });
  }

  initMouseOver() {
    this.elem = document.getElementById('csdLDLMap');
    if (this.elem) {
      this.subscription = observableFromEvent(this.elem, 'mousemove').subscribe( (event: any) => {
      this.mouseposition = event;
      this.parentOffset = this.elem.offsetParent;
    });
  }
  }

  showMapObject() {
    return JSON.stringify(this.currMap);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
