import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services/data.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrMapCellComponent } from './nr-map-cell.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NrMapCellComponent', () => {
  let component: NrMapCellComponent;
  let fixture: ComponentFixture<NrMapCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrMapCellComponent,
        NrDatafortComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrMapCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
