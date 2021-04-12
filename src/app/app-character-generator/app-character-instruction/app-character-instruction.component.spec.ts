import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterInstructionComponent } from './app-character-instruction.component';

describe('AppCharacterInstructionComponent', () => {
  let component: AppCharacterInstructionComponent;
  let fixture: ComponentFixture<AppCharacterInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCharacterInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
