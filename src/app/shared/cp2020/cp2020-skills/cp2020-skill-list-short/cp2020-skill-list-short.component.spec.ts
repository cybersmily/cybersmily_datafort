import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SkillListShortComponent } from './cp2020-skill-list-short.component';

describe('Cp2020SkillListShortComponent', () => {
  let component: Cp2020SkillListShortComponent;
  let fixture: ComponentFixture<Cp2020SkillListShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SkillListShortComponent ],
      imports: [CommonUiModule],
      providers: [DiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SkillListShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
