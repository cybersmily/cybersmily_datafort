import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpRedWoundsModule } from './../../cp-red-wounds.module';

import { CpRedInjuriesDisplayComponent } from './cp-red-injuries-display.component';

describe('CpRedInjuriesDisplayComponent', () => {
  let component: CpRedInjuriesDisplayComponent;
  let fixture: ComponentFixture<CpRedInjuriesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedInjuriesDisplayComponent],
      imports: [
        CpRedWoundsModule,
        CommonUiModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedInjuriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
