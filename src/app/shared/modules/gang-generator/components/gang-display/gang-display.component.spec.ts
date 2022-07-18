import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GangDisplayComponent } from './gang-display.component';

describe('GangDisplayComponent', () => {
  let component: GangDisplayComponent;
  let fixture: ComponentFixture<GangDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GangDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GangDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
