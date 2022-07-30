import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWoundsDisplayComponent } from './cp-red-wounds-display.component';

describe('CpRedWoundsDisplayComponent', () => {
  let component: CpRedWoundsDisplayComponent;
  let fixture: ComponentFixture<CpRedWoundsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedWoundsDisplayComponent ]
    })
    .compileComponents();
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
