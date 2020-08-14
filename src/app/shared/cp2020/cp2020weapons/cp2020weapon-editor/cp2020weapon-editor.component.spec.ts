import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponEditorComponent } from './cp2020weapon-editor.component';

describe('Cp2020weaponEditorComponent', () => {
  let component: Cp2020weaponEditorComponent;
  let fixture: ComponentFixture<Cp2020weaponEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Cp2020weaponEditorComponent],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
