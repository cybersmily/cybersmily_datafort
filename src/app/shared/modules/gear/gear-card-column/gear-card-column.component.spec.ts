import { CommonUiModule } from './../../common-ui/common-ui.module';
import { GearCardComponent } from './../gear-card/gear-card.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GearCardColumnComponent } from './gear-card-column.component';
import { Gear } from '../../../models/gear';

describe('GearCardColumnComponent', () => {
  let component: GearCardColumnComponent;
  let fixture: ComponentFixture<GearCardColumnComponent>;
  const gearList: Gear[] = [
    {
      name: 'testgear1',
      cost: '111000',
      desc: 'this is a test'
    },
    {
      name: 'testgear2',
      cost: '100',
      desc: 'this is a test'
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GearCardColumnComponent,
        GearCardComponent
      ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearCardColumnComponent);
    component = fixture.componentInstance;
    component.gearList = gearList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
  TestBed.resetTestingModule();
});
});
