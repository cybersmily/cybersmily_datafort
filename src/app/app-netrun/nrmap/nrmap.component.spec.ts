import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NrMapCellComponent } from './../nr-map-cell/nr-map-cell.component';

import { NrmapComponent } from './nrmap.component';
import { NrgridboxComponent } from '../nrgridbox/nrgridbox.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { NrTrackerService } from '../services';
import { DiceService } from './../../shared/services/dice/dice.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrmapComponent', () => {
  let component: NrmapComponent;
  let fixture: ComponentFixture<NrmapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        NrmapComponent,
        NrMapCellComponent,
        NrgridboxComponent,
        NrDatafortComponent
    ],
    imports: [NgxUiLoaderModule,
        CommonUiModule],
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
    fixture = TestBed.createComponent(NrmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
