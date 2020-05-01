import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
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
        FormsModule,
        HttpClientModule
      ],
      providers: [
        DataService
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
