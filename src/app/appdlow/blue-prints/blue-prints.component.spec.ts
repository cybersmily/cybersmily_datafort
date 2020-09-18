import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluePrintsComponent } from './blue-prints.component';

describe('BluePrintsComponent', () => {
  let component: BluePrintsComponent;
  let fixture: ComponentFixture<BluePrintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluePrintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluePrintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
