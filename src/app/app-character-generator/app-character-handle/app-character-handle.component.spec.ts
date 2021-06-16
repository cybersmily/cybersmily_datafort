import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppCharacterHandleComponent } from './app-character-handle.component';

describe('AppCharacterHandleComponent', () => {
  let component: AppCharacterHandleComponent;
  let fixture: ComponentFixture<AppCharacterHandleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterHandleComponent ],
      imports: [
        CommonUiModule,
      HttpClientTestingModule
    ],
      providers: [
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
