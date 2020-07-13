import { SeoService } from './../../shared/services/seo/seo.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopoverModule, TooltipModule, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NrMapCellComponent } from './../nr-map-cell/nr-map-cell.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { NrnavigatorComponent } from './../nrnavigator/nrnavigator.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrmainComponent } from './nrmain.component';
import { NrdebugComponent } from '../nrdebug/nrdebug.component';
import { NrTraceviewComponent } from '../nr-traceview/nr-traceview.component';
import { NrinstructComponent } from '../nrinstruct/nrinstruct.component';
import { NrMapGridComponent } from '../nr-map-grid/nr-map-grid.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { DataService } from './../../shared/services/data.service';
import { NrTrackerService } from '../services';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('NrmainComponent', () => {
  let component: NrmainComponent;
  let fixture: ComponentFixture<NrmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrmainComponent,
        NrnavigatorComponent,
        NrdebugComponent,
        NrTraceviewComponent,
        NrinstructComponent,
        NrMapGridComponent,
        NrMapCellComponent,
        NrDatafortComponent
    ],
    imports: [
      FormsModule,
      PopoverModule.forRoot(),
      TooltipModule.forRoot(),
      NgxUiLoaderModule,
      HttpClientTestingModule,
      ModalModule
    ],
    providers: [
      DataService,
      BsModalService,
      BsModalRef,
      NrTrackerService,
      DiceService,
      SeoService
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
