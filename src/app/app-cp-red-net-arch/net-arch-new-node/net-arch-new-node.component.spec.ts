import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchNewNodeComponent } from './net-arch-new-node.component';

describe('NetArchNewNodeComponent', () => {
  let component: NetArchNewNodeComponent;
  let fixture: ComponentFixture<NetArchNewNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetArchNewNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchNewNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
