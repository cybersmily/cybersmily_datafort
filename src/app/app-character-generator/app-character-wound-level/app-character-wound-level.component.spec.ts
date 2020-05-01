import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterWoundLevelComponent } from './app-character-wound-level.component';

describe('AppCharacterWoundLevelComponent', () => {
  let component: AppCharacterWoundLevelComponent;
  let fixture: ComponentFixture<AppCharacterWoundLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterWoundLevelComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterWoundLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
