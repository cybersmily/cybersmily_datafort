import { DiceService } from './../../shared/services/dice/dice.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services/data.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterRoleComponent } from './app-character-role.component';

describe('AppCharacterRoleComponent', () => {
  let component: AppCharacterRoleComponent;
  let fixture: ComponentFixture<AppCharacterRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCharacterRoleComponent ],
      imports: [
        CommonUiModule,
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
    fixture = TestBed.createComponent(AppCharacterRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
