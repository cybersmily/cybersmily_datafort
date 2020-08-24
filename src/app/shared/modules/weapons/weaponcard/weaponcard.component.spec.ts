import { CommonUiModule } from './../../common-ui/common-ui.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CpWeapon } from '../../../models/weapon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponcardComponent } from './weaponcard.component';

describe('WeaponcardComponent', () => {
  let component: WeaponcardComponent;
  let fixture: ComponentFixture<WeaponcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponcardComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponcardComponent);
    const wpn: CpWeapon = {
      name: 'testgun',
      type: 'p',
      wa: '0',
      conc: 'J',
      avail: 'R',
      ammo: '9mm(2d6+1)',
      shots: '40',
      rof: '1/30',
      rel: 'UR',
      cost: '5000',
      notes: ''
    };
    component = fixture.componentInstance;
    component.wpn = wpn;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have weapon', () => {
    expect(component.wpn).toBeTruthy();
    expect(component.wpn.name).toEqual('testgun');
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
