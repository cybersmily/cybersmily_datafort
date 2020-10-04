import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SaveWoundsComponent } from './cp2020-save-wounds.component';

describe('Cp2020SaveWoundsComponent', () => {
  let component: Cp2020SaveWoundsComponent;
  let fixture: ComponentFixture<Cp2020SaveWoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020SaveWoundsComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SaveWoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
