import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchNodeComponent } from './net-arch-node.component';

describe('NetArchNodeComponent', () => {
  let component: NetArchNodeComponent;
  let fixture: ComponentFixture<NetArchNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetArchNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
