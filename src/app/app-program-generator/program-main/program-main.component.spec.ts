import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMainComponent } from './program-main.component';

describe('ProgramMainComponent', () => {
  let component: ProgramMainComponent;
  let fixture: ComponentFixture<ProgramMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
