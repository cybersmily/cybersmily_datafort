import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrDatafortComponent } from './nr-datafort.component';
import { DataService } from './../../shared/services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NrTrackerService } from '../services';
import { NRDataFort } from '../models';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrDatafortComponent', () => {
  let component: NrDatafortComponent;
  let fixture: ComponentFixture<NrDatafortComponent>;
  let dataFort: NRDataFort;
  let row: number;
  let column: number;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [NrDatafortComponent],
    imports: [CommonUiModule],
    providers: [
        DataService,
        NrTrackerService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
