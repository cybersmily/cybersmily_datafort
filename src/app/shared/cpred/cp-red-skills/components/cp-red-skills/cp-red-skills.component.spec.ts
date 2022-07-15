import { PipesModule } from './../../../../pipes/pipes.module';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CpRedSkillDataService } from './../../services/cp-red-skill-data/cp-red-skill-data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsComponent } from './cp-red-skills.component';

describe('CpRedSkillsComponent', () => {
  let component: CpRedSkillsComponent;
  let fixture: ComponentFixture<CpRedSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedSkillsComponent],
      imports: [HttpClientTestingModule, PipesModule],
      providers: [CpRedSkillDataService, DataService],
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
