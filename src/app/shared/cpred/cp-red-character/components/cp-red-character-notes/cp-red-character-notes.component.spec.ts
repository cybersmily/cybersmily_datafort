import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterNotesComponent } from './cp-red-character-notes.component';

describe('CpRedCharacterNotesComponent', () => {
  let component: CpRedCharacterNotesComponent;
  let fixture: ComponentFixture<CpRedCharacterNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCharacterNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
