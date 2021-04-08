import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchFormComponent } from './net-arch-form.component';

describe('NetArchFormComponent', () => {
  let component: NetArchFormComponent;
  let fixture: ComponentFixture<NetArchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetArchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
