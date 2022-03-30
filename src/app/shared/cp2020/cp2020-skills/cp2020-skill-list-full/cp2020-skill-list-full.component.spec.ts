import { PipesModule } from './../../../pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SkillListFullComponent } from './cp2020-skill-list-full.component';

describe('Cp2020SkillListFullComponent', () => {
  let component: Cp2020SkillListFullComponent;
  let fixture: ComponentFixture<Cp2020SkillListFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SkillListFullComponent ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule,
        PipesModule
      ],
      providers: [DiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SkillListFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
