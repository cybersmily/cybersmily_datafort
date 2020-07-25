import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramNewComponent } from './program-new.component';

describe('ProgramNewComponent', () => {
  let component: ProgramNewComponent;
  let fixture: ComponentFixture<ProgramNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
