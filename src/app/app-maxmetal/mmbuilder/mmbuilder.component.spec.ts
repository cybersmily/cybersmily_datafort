import { MmweaponComponent } from './../mmweapon/mmweapon.component';
import { MmoptionComponent } from './../mmoption/mmoption.component';
import { MmoptionslistComponent } from './../mmoptionslist/mmoptionslist.component';
import { MmweaponlistComponent } from './../mmweaponlist/mmweaponlist.component';
import { MmoptionsformComponent } from './../mmoptionsform/mmoptionsform.component';
import { MmweaponformComponent } from './../mmweaponform/mmweaponform.component';
import { MminputComponent } from './../mminput/mminput.component';
import { FormsModule } from '@angular/forms';
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
        FormsModule
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
