import { CommonUiModule } from './../../common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GearCardComponent } from './gear-card.component';
import { Gear } from '../../../models/gear';

describe('GearCardComponent', () => {
  let component: GearCardComponent;
  let fixture: ComponentFixture<GearCardComponent>;

  const gear: Gear = {
    name: 'testgear1',
    cost: '111000',
    desc: 'this is a test'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GearCardComponent ],
      imports: [ CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearCardComponent);
    component = fixture.componentInstance;
    component.gear = gear;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
