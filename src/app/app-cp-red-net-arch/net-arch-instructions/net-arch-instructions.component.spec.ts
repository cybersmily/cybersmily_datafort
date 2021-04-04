import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchInstructionsComponent } from './net-arch-instructions.component';

describe('NetArchInstructionsComponent', () => {
  let component: NetArchInstructionsComponent;
  let fixture: ComponentFixture<NetArchInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetArchInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
