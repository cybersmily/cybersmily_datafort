import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiceService } from './../../shared/services/dice/dice.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterStatsComponent } from './app-character-stats.component';

describe('AppCharacterStatsComponent', () => {
  let component: AppCharacterStatsComponent;
  let fixture: ComponentFixture<AppCharacterStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterStatsComponent ],
      imports: [ FormsModule, FontAwesomeModule],
      providers: [ DiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
