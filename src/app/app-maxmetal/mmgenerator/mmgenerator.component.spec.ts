import { SeoService } from './../../shared/services/seo/seo.service';
import { LongpressDirective } from './../../shared/directives/longpress.directive';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MmoptionslistComponent } from './../mmoptionslist/mmoptionslist.component';
import { MmweaponlistComponent } from './../mmweaponlist/mmweaponlist.component';
import { MmoptionsformComponent } from './../mmoptionsform/mmoptionsform.component';
import { MmweaponformComponent } from './../mmweaponform/mmweaponform.component';
import { MaxmetalService } from '../../shared/services/maxmetal/maxmetal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MmmountComponent } from './../mmmount/mmmount.component';
import { MmoptionComponent } from './../mmoption/mmoption.component';
import { MminputComponent } from './../mminput/mminput.component';
import { MmmountsComponent } from './../mmmounts/mmmounts.component';
import { MmaccessoriesComponent } from './../mmaccessories/mmaccessories.component';
import { MmbuilderComponent } from './../mmbuilder/mmbuilder.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmgeneratorComponent } from './mmgenerator.component';
import { MmweaponComponent } from '../mmweapon/mmweapon.component';
import { DataService } from './../../shared/services/file-services/data.service';

describe('MmgeneratorComponent', () => {
  let component: MmgeneratorComponent;
  let fixture: ComponentFixture<MmgeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmgeneratorComponent,
        MmbuilderComponent,
        MmaccessoriesComponent,
        MmmountsComponent,
        MmmountComponent,
        MminputComponent,
        MmweaponComponent,
        MmoptionComponent,
        MmweaponformComponent,
        MmoptionsformComponent,
        MmweaponlistComponent,
        MmoptionslistComponent,
        LongpressDirective
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        MaxmetalService,
        SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
