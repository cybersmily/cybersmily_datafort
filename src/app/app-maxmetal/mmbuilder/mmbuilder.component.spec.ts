import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MmweaponComponent } from './../mmweapon/mmweapon.component';
import { MmoptionComponent } from './../mmoption/mmoption.component';
import { MmoptionslistComponent } from './../mmoptionslist/mmoptionslist.component';
import { MmweaponlistComponent } from './../mmweaponlist/mmweaponlist.component';
import { MmoptionsformComponent } from './../mmoptionsform/mmoptionsform.component';
import { MmweaponformComponent } from './../mmweaponform/mmweaponform.component';
import { MminputComponent } from './../mminput/mminput.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmbuilderComponent } from './mmbuilder.component';
import { LongpressDirective } from './../../shared/directives/longpress.directive';
import { MaxmetalService } from '../../shared/cp2020/cp2020-vehicles/services';

describe('MmbuilderComponent', () => {
  let component: MmbuilderComponent;
  let fixture: ComponentFixture<MmbuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmbuilderComponent,
        MminputComponent,
        MmweaponformComponent,
        MmoptionsformComponent,
        MmweaponlistComponent,
        MmweaponComponent,
        MmoptionslistComponent,
        MmoptionComponent,
        LongpressDirective
      ],
      imports: [
        CommonUiModule
      ],
      providers: [
        MaxmetalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
