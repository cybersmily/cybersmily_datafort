import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrMapCellComponent } from './nr-map-cell.component';
import { NrDatafortComponent } from '../nr-datafort/nr-datafort.component';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NrMapCellComponent', () => {
  let component: NrMapCellComponent;
  let fixture: ComponentFixture<NrMapCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrMapCellComponent,
        NrDatafortComponent
      ],
      imports: [
        PopoverModule,
        HttpClientTestingModule,
        TooltipModule.forRoot()
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
