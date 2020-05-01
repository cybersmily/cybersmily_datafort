import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterWeaponsComponent } from './app-character-weapons.component';

describe('AppCharacterWeaponsComponent', () => {
  let component: AppCharacterWeaponsComponent;
  let fixture: ComponentFixture<AppCharacterWeaponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterWeaponsComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
