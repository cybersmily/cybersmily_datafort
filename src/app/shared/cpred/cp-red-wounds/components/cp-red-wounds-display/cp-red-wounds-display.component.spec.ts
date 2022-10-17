import { CpRedWoundsManagerService } from './../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { CpRedWoundsModule } from './../../cp-red-wounds.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWoundsDisplayComponent } from './cp-red-wounds-display.component';

describe('CpRedWoundsDisplayComponent', () => {
  let component: CpRedWoundsDisplayComponent;
  let fixture: ComponentFixture<CpRedWoundsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedWoundsDisplayComponent],
      imports: [
        CpRedWoundsModule,
        CommonUiModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
      providers: [CpRedWoundsManagerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedWoundsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
