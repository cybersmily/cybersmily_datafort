import { SeoService } from './../../shared/services/seo/seo.service';
import { LongpressDirective } from './../../shared/directives/longpress.directive';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MmoptionslistComponent } from './../mmoptionslist/mmoptionslist.component';
import { MmweaponlistComponent } from './../mmweaponlist/mmweaponlist.component';
import { MmoptionsformComponent } from './../mmoptionsform/mmoptionsform.component';
import { MmweaponformComponent } from './../mmweaponform/mmweaponform.component';
import { MaxmetalService } from '../../shared/services/maxmetal/maxmetal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MmmountComponent } from './../mmmount/mmmount.component';
import { MmoptionComponent } from './../mmoption/mmoption.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule, CollapseModule } from 'ngx-bootstrap';
import { MminputComponent } from './../mminput/mminput.component';
import { FormsModule } from '@angular/forms';
import { MmmountsComponent } from './../mmmounts/mmmounts.component';
import { MmaccessoriesComponent } from './../mmaccessories/mmaccessories.component';
import { MmbuilderComponent } from './../mmbuilder/mmbuilder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmgeneratorComponent } from './mmgenerator.component';
import { MmweaponComponent } from '../mmweapon/mmweapon.component';
import { DataService } from './../../shared/services/data.service';

describe('MmgeneratorComponent', () => {
  let component: MmgeneratorComponent;
  let fixture: ComponentFixture<MmgeneratorComponent>;

  beforeEach(async(() => {
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
        BsModalService,
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
