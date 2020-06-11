import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugLabGeneratorComponent } from './drug-lab-generator.component';

describe('DrugLabGeneratorComponent', () => {
  let component: DrugLabGeneratorComponent;
  let fixture: ComponentFixture<DrugLabGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugLabGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugLabGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
