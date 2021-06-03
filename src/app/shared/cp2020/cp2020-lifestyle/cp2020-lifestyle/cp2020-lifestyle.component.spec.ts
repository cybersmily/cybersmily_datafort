import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020LifestyleComponent } from './cp2020-lifestyle.component';

describe('Cp2020LifestyleComponent', () => {
  let component: Cp2020LifestyleComponent;
  let fixture: ComponentFixture<Cp2020LifestyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020LifestyleComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020LifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
