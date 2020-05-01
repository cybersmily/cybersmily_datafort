import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrgridboxComponent } from './nrgridbox.component';
import { NRMapCell } from '../models';

describe('NrgridboxComponent', () => {
  let component: NrgridboxComponent;
  let fixture: ComponentFixture<NrgridboxComponent>;
  let cell: NRMapCell;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrgridboxComponent
      ],
      imports: [
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
