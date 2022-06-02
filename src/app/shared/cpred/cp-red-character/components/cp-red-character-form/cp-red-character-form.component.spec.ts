import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterFormComponent } from './cp-red-character-form.component';

describe('CpRedCharacterFormComponent', () => {
  let component: CpRedCharacterFormComponent;
  let fixture: ComponentFixture<CpRedCharacterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCharacterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
