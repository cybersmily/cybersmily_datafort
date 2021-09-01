import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppCharacterLifepathComponent } from './app-character-lifepath.component';

describe('AppCharacterLifepathComponent', () => {
  let component: AppCharacterLifepathComponent;
  let fixture: ComponentFixture<AppCharacterLifepathComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterLifepathComponent
      ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule,
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
