import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterArmorComponent } from './app-character-armor.component';

describe('AppCharacterArmorComponent', () => {
  let component: AppCharacterArmorComponent;
  let fixture: ComponentFixture<AppCharacterArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterArmorComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
