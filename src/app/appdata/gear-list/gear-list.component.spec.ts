import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearListComponent } from './gear-list.component';

describe('GearListComponent', () => {
  let component: GearListComponent;
  let fixture: ComponentFixture<GearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GearListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
