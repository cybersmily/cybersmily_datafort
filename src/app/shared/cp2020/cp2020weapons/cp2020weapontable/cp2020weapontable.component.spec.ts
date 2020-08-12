import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weapontableComponent } from './cp2020weapontable.component';

describe('Cp2020weapontableComponent', () => {
  let component: Cp2020weapontableComponent;
  let fixture: ComponentFixture<Cp2020weapontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020weapontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weapontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
