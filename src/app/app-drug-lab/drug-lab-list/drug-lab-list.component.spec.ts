import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugLabListComponent } from './drug-lab-list.component';

describe('DrugLabListComponent', () => {
  let component: DrugLabListComponent;
  let fixture: ComponentFixture<DrugLabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugLabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugLabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
