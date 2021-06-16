import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MaxMetalOption } from '../../shared/models/maxmetal';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmoptionComponent } from './mmoption.component';

describe('MmoptionComponent', () => {
  let component: MmoptionComponent;
  let fixture: ComponentFixture<MmoptionComponent>;
  let option: MaxMetalOption;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MmoptionComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmoptionComponent);
    component = fixture.componentInstance;
    option = new MaxMetalOption();
    option.name = 'test';
    option.spaces = '0';
    option.cost = '';
    component.item = option;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
