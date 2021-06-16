import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrgridboxComponent } from './nrgridbox.component';
import { NRMapCell } from '../models';

describe('NrgridboxComponent', () => {
  let component: NrgridboxComponent;
  let fixture: ComponentFixture<NrgridboxComponent>;
  let cell: NRMapCell;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrgridboxComponent
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
    fixture = TestBed.createComponent(NrgridboxComponent);
    component = fixture.componentInstance;
    cell = {
      hasVisited: false,
      row: 1,
      column: 1,
      width: 50,
      height: 50
    };
    component.cell = cell;
    component.mapType = 'c';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
