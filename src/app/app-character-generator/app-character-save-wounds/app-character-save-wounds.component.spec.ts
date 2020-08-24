import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { FormsModule } from '@angular/forms';
import { AppCharacterWoundLevelComponent } from './../app-character-wound-level/app-character-wound-level.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCharacterSaveWoundsComponent } from './app-character-save-wounds.component';

describe('AppCharacterSaveWoundsComponent', () => {
  let component: AppCharacterSaveWoundsComponent;
  let fixture: ComponentFixture<AppCharacterSaveWoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterSaveWoundsComponent,
        AppCharacterWoundLevelComponent
      ],
      imports: [
        CommonUiModule
      ],
      providers: [
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterSaveWoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
