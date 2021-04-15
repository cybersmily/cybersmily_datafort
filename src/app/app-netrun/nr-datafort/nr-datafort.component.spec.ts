import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrDatafortComponent } from './nr-datafort.component';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NrTrackerService } from '../services';
import { NRDataFort } from '../models';
import { compileNgModule } from '@angular/compiler';

describe('NrDatafortComponent', () => {
  let component: NrDatafortComponent;
  let fixture: ComponentFixture<NrDatafortComponent>;
  let dataFort: NRDataFort;
  let row: number;
  let column: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrDatafortComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(NrDatafortComponent);
    dataFort = {type: '', name: 'test datafort', img: ''};
    row = 1;
    column = 1;
    component = fixture.componentInstance;
    component.dataFort = dataFort;
    component.row = row;
    component.column = column;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
