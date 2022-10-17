import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../common-ui/common-ui.module';
import { DiceService } from './../../../../services/dice/dice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubberDisplayComponent } from './clubber-display.component';

describe('ClubberDisplayComponent', () => {
  let component: ClubberDisplayComponent;
  let fixture: ComponentFixture<ClubberDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubberDisplayComponent],
      imports: [CommonUiModule, BrowserAnimationsModule],
      providers: [DiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubberDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
