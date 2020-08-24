import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/data.service';
import { TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NrMapCellComponent } from './../nr-map-cell/nr-map-cell.component';

import { NrmapComponent } from './nrmap.component';
import { NrgridboxComponent } from '../nrgridbox/nrgridbox.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { NrTrackerService } from '../services';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('NrmapComponent', () => {
  let component: NrmapComponent;
  let fixture: ComponentFixture<NrmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrmapComponent,
        NrMapCellComponent,
        NrgridboxComponent,
        NrDatafortComponent
      ],
      imports: [
        NgxUiLoaderModule,
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        NrTrackerService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
