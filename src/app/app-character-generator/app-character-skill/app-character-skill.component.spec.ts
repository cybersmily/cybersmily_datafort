import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiceService } from './../../shared/services/dice/dice.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterSkillComponent } from './app-character-skill.component';

describe('AppCharacterSkillComponent', () => {
  let component: AppCharacterSkillComponent;
  let fixture: ComponentFixture<AppCharacterSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterSkillComponent ],
      imports: [ FormsModule,
        ModalModule.forRoot(),
        FontAwesomeModule
      ],
      providers: [BsModalService, DiceService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
