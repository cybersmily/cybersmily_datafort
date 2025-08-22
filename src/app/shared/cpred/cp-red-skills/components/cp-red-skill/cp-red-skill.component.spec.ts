import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CpRedSkillsModule } from './../../cp-red-skills.module';
import { DiceService } from './../../../../services/dice/dice.service';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillComponent } from './cp-red-skill.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedSkillComponent', () => {
  let component: CpRedSkillComponent;
  let fixture: ComponentFixture<CpRedSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CpRedSkillComponent],
    imports: [CommonUiModule,
        CpRedSkillsModule,
        BrowserAnimationsModule],
    providers: [DiceService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
