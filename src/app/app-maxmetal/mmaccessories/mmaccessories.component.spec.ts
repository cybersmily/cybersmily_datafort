import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmaccessoriesComponent } from './mmaccessories.component';
import { MmweaponComponent } from '../mmweapon/mmweapon.component';
import { MmoptionComponent } from '../mmoption/mmoption.component';

describe('MmaccessoriesComponent', () => {
  let component: MmaccessoriesComponent;
  let fixture: ComponentFixture<MmaccessoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmaccessoriesComponent,
        MmweaponComponent,
        MmoptionComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmaccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
