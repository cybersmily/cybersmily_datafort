import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MaxMetalOption } from '../../shared/models/maxmetal';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmweaponComponent } from './mmweapon.component';

describe('MmweaponComponent', () => {
  let component: MmweaponComponent;
  let fixture: ComponentFixture<MmweaponComponent>;

  beforeEach(async(() => {
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
