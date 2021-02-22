import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchMainComponent } from './net-arch-main.component';

describe('NetArchMainComponent', () => {
  let component: NetArchMainComponent;
  let fixture: ComponentFixture<NetArchMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetArchMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
