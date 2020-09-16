import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GangsComponent } from './gangs.component';

describe('GangsComponent', () => {
  let component: GangsComponent;
  let fixture: ComponentFixture<GangsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GangsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
