import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MmoptionComponent } from './../mmoption/mmoption.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmoptionslistComponent } from './mmoptionslist.component';

describe('MmoptionslistComponent', () => {
  let component: MmoptionslistComponent = new MmoptionslistComponent();
  let fixture: ComponentFixture<MmoptionslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmoptionslistComponent,
        MmoptionComponent
      ],
      imports: [ CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmoptionslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
