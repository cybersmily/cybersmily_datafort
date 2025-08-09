import { NRTraceItem } from '../models';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NrTrackerService } from '../services';

@Component({
    selector: 'cs-nr-traceview',
    templateUrl: './nr-traceview.component.html',
    styleUrls: ['./nr-traceview.component.css'],
    standalone: false
})
export class NrTraceviewComponent implements OnInit {
  modalRef: BsModalRef;
  totalTrace = 0;
  totalRegions = new Array<string>();
  totalCities = 0;
  traceList: NRTraceItem[];

  constructor( private bsModalService: BsModalService, private nrTraceService: NrTrackerService) { }

  ngOnInit() {
    this.nrTraceService.TraceList.subscribe( traces => {
      this.traceList = traces;
      this.totalTrace = 0;
      this.totalCities = traces.length;
      this.traceList.map( trace => {
        this.totalTrace += trace.trace;
        const found = this.totalRegions.find( r => r === trace.region);
        if (!found) {
          this.totalRegions.push(trace.region);
        }
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template);
  }
}
