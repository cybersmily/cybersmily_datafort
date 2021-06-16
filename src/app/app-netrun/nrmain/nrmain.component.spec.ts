import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NrMapCellComponent } from './../nr-map-cell/nr-map-cell.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { NrnavigatorComponent } from './../nrnavigator/nrnavigator.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrmainComponent } from './nrmain.component';
import { NrdebugComponent } from '../nrdebug/nrdebug.component';
import { NrTraceviewComponent } from '../nr-traceview/nr-traceview.component';
import { NrinstructComponent } from '../nrinstruct/nrinstruct.component';
import { NrMapGridComponent } from '../nr-map-grid/nr-map-grid.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { DataService } from './../../shared/services/file-services/data.service';
import { NrTrackerService } from '../services';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('NrmainComponent', () => {
  let component: NrmainComponent;
  let fixture: ComponentFixture<NrmainComponent>;

  beforeEach(waitForAsync(() => {
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
      CommonUiModule,
      NgxUiLoaderModule,
      HttpClientTestingModule
    ],
    providers: [
      DataService,
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
