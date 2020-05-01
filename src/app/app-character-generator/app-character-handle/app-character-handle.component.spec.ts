import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterHandleComponent } from './app-character-handle.component';

describe('AppCharacterHandleComponent', () => {
  let component: AppCharacterHandleComponent;
  let fixture: ComponentFixture<AppCharacterHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterHandleComponent ],
      imports: [ FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
