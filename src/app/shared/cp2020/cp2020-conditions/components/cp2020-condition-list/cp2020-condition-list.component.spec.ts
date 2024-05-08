import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ConditionListComponent } from './cp2020-condition-list.component';

describe('Cp2020ConditionListComponent', () => {
  let component: Cp2020ConditionListComponent;
  let fixture: ComponentFixture<Cp2020ConditionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cp2020ConditionListComponent]
    });
    fixture = TestBed.createComponent(Cp2020ConditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
