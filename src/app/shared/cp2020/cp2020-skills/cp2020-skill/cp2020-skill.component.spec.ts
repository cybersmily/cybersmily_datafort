import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SkillComponent } from './cp2020-skill.component';

describe('Cp2020SkillComponent', () => {
  let component: Cp2020SkillComponent;
  let fixture: ComponentFixture<Cp2020SkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SkillComponent ],
      imports: [ CommonUiModule],
      providers: [DiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
