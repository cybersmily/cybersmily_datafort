import { HttpClientModule } from '@angular/common/http';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterLifepathComponent } from './app-character-lifepath.component';

describe('AppCharacterLifepathComponent', () => {
  let component: AppCharacterLifepathComponent;
  let fixture: ComponentFixture<AppCharacterLifepathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterLifepathComponent
      ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule
      ],
      providers: [
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterLifepathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
