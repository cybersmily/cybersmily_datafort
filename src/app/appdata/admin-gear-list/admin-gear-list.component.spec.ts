import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGearListComponent } from './admin-gear-list.component';

describe('AdminGearListComponent', () => {
  let component: AdminGearListComponent;
  let fixture: ComponentFixture<AdminGearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGearListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
