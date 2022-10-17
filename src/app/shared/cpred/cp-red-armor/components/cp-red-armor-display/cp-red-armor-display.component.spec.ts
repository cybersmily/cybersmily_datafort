import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { CpRedArmorModule } from './../../cp-red-armor.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedArmorDisplayComponent } from './cp-red-armor-display.component';

describe('CpRedArmorDisplayComponent', () => {
  let component: CpRedArmorDisplayComponent;
  let fixture: ComponentFixture<CpRedArmorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedArmorDisplayComponent],
      imports: [CpRedArmorModule, CommonUiModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedArmorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
