import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmaccessoriesComponent } from './mmaccessories.component';
import { MmweaponComponent } from '../mmweapon/mmweapon.component';
import { MmoptionComponent } from '../mmoption/mmoption.component';

describe('MmaccessoriesComponent', () => {
  let component: MmaccessoriesComponent;
  let fixture: ComponentFixture<MmaccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmaccessoriesComponent,
        MmweaponComponent,
        MmoptionComponent
      ],
      imports: [
        AccordionModule.forRoot(),
        FontAwesomeModule,
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
