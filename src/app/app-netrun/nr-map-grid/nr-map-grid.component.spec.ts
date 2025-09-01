import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrMapGridComponent } from './nr-map-grid.component';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';
import { NrMapCellComponent } from '../nr-map-cell/nr-map-cell.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { DataService } from './../../shared/services/file-services';
import { NrTrackerService } from '../services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrMapGridComponent', () => {
  let component: NrMapGridComponent;
  let fixture: ComponentFixture<NrMapGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        NrMapGridComponent,
        NrMapCellComponent,
        NrDatafortComponent
    ],
    imports: [NgxUiLoaderModule,
        CommonUiModule],
    providers: [
        NgxUiLoaderService,
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
    fixture = TestBed.createComponent(NrMapGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
