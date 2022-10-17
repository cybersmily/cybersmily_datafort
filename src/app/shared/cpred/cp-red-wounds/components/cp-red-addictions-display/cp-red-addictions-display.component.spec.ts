import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpRedWoundsModule } from './../../cp-red-wounds.module';

import { CpRedAddictionsDisplayComponent } from './cp-red-addictions-display.component';

describe('CpRedAddictionsDisplayComponent', () => {
  let component: CpRedAddictionsDisplayComponent;
  let fixture: ComponentFixture<CpRedAddictionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedAddictionsDisplayComponent],
      imports: [
        CpRedWoundsModule,
        CommonUiModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedAddictionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
