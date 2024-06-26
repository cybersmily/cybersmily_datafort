import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { CpWeapon } from '../../../cp2020/cp2020weapons/models';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeaponcardComponent } from './weaponcard.component';

describe('WeaponcardComponent', () => {
  let component: WeaponcardComponent;
  let fixture: ComponentFixture<WeaponcardComponent>;

  beforeEach(waitForAsync(() => {
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
