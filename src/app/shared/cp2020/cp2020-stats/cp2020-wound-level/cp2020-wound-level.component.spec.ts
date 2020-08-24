import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020WoundLevelComponent } from './cp2020-wound-level.component';

describe('Cp2020WoundLevelComponent', () => {
  let component: Cp2020WoundLevelComponent;
  let fixture: ComponentFixture<Cp2020WoundLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020WoundLevelComponent ],
      imports: [ CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020WoundLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
