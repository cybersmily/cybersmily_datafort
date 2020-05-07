import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MmweaponComponent } from './../mmweapon/mmweapon.component';
import { MmoptionComponent } from './../mmoption/mmoption.component';
import { MmoptionslistComponent } from './../mmoptionslist/mmoptionslist.component';
import { MmweaponlistComponent } from './../mmweaponlist/mmweaponlist.component';
import { MmoptionsformComponent } from './../mmoptionsform/mmoptionsform.component';
import { MmweaponformComponent } from './../mmweaponform/mmweaponform.component';
import { MminputComponent } from './../mminput/mminput.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmbuilderComponent } from './mmbuilder.component';
import { LongpressDirective } from './../../shared/directives/longpress.directive';
import { MaxmetalService } from '../../shared/services/maxmetal/maxmetal.service';

describe('MmbuilderComponent', () => {
  let component: MmbuilderComponent;
  let fixture: ComponentFixture<MmbuilderComponent>;

  beforeEach(async(() => {
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
        MaxmetalService,
        BsModalService
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
