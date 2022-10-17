import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CpRedSkillsModule } from './../../cp-red-skills.module';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { PipesModule } from './../../../../pipes/pipes.module';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsComponent } from './cp-red-skills.component';

describe('CpRedSkillsComponent', () => {
  let component: CpRedSkillsComponent;
  let fixture: ComponentFixture<CpRedSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedSkillsComponent],
      imports: [
        HttpClientTestingModule,
        CpRedSkillsModule,
        CommonUiModule,
        BrowserAnimationsModule,
        PipesModule,
      ],
      providers: [DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
