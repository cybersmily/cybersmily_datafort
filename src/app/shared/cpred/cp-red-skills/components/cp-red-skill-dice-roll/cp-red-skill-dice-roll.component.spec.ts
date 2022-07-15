import { DiceService } from './../../../../services/dice/dice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillDiceRollComponent } from './cp-red-skill-dice-roll.component';

describe('CpRedSkillDiceRollComponent', () => {
  let component: CpRedSkillDiceRollComponent;
  let fixture: ComponentFixture<CpRedSkillDiceRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedSkillDiceRollComponent],
      providers: [DiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillDiceRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
