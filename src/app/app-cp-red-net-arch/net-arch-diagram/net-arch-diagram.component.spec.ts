import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchDiagramComponent } from './net-arch-diagram.component';

describe('NetArchDiagramComponent', () => {
  let component: NetArchDiagramComponent;
  let fixture: ComponentFixture<NetArchDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetArchDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
