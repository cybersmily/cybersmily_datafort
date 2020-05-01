import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiceService } from './../../shared/services/dice/dice.service';
import { AppCharacterCyberwareComponent } from './../app-character-cyberware/app-character-cyberware.component';
import { AppCharacterSkillComponent } from './../app-character-skill/app-character-skill.component';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap';

import { AppCharacterSkillsComponent } from './app-character-skills.component';

describe('AppCharacterSkillsComponent', () => {
  let component: AppCharacterSkillsComponent;
  let fixture: ComponentFixture<AppCharacterSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterSkillsComponent,
        AppCharacterSkillComponent,
        AppCharacterCyberwareComponent
      ],
      imports: [
        FormsModule,
        ModalModule.forRoot(),
        FontAwesomeModule
      ],
      providers: [
        BsModalService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
