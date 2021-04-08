import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchSettingsComponent } from './net-arch-settings.component';

describe('NetArchSettingsComponent', () => {
  let component: NetArchSettingsComponent;
  let fixture: ComponentFixture<NetArchSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetArchSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
