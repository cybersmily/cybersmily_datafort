import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MaxMetalOption } from '../../shared/cp2020/cp2020-vehicles/models';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmweaponComponent } from './mmweapon.component';

describe('MmweaponComponent', () => {
  let component: MmweaponComponent;
  let fixture: ComponentFixture<MmweaponComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MmweaponComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmweaponComponent);
    component = fixture.componentInstance;
    const wpn = new MaxMetalOption();
    wpn.name = 'test weapon';
    wpn.spaces = '--';
    wpn.cost = 400;
    component.item = wpn;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.item = {name: 'test', spaces: '0', cost: 0};
    expect(component).toBeTruthy();
  });
});
