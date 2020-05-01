import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterCyberwareComponent } from './app-character-cyberware.component';

describe('AppCharacterCyberwareComponent', () => {
  let component: AppCharacterCyberwareComponent;
  let fixture: ComponentFixture<AppCharacterCyberwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterCyberwareComponent ],
      imports: [ FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterCyberwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
