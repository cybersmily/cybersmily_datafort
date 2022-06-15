import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubberDisplayComponent } from './clubber-display.component';

describe('ClubberDisplayComponent', () => {
  let component: ClubberDisplayComponent;
  let fixture: ComponentFixture<ClubberDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubberDisplayComponent ]
    })
    .compileComponents();
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
