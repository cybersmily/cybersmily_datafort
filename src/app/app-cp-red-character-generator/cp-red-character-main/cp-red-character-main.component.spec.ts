import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CpRedCharacterModule } from './../../shared/cpred/cp-red-character/cp-red-character.module';
import { CpRedSkillDataService } from './../../shared/cpred/cp-red-skills/services/cp-red-skill-data/cp-red-skill-data.service';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CpRedSkillsModule } from './../../shared/cpred/cp-red-skills/cp-red-skills.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CpRedCharacterMainComponent } from './cp-red-character-main.component';

describe('CpRedCharacterMainComponent', () => {
  let component: CpRedCharacterMainComponent;
  let fixture: ComponentFixture<CpRedCharacterMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CpRedCharacterMainComponent],
      imports: [
        CpRedSkillsModule,
        CpRedCharacterModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [DataService, CpRedSkillDataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
