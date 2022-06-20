import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedRoleDisplayComponent } from './cp-red-role-display.component';

describe('CpRedRoleDisplayComponent', () => {
  let component: CpRedRoleDisplayComponent;
  let fixture: ComponentFixture<CpRedRoleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedRoleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedRoleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
