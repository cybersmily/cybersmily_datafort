import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaViewMainComponent } from './beta-view-main.component';

describe('BetaViewMainComponent', () => {
  let component: BetaViewMainComponent;
  let fixture: ComponentFixture<BetaViewMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaViewMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
