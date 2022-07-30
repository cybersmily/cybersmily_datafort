import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedRolesDisplayComponent } from './cp-red-roles-display.component';

describe('CpRedRolesDisplayComponent', () => {
  let component: CpRedRolesDisplayComponent;
  let fixture: ComponentFixture<CpRedRolesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedRolesDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedRolesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
