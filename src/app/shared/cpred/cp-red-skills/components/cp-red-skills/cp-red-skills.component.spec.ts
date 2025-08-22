import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CpRedSkillsModule } from './../../cp-red-skills.module';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { PipesModule } from './../../../../pipes/pipes.module';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsComponent } from './cp-red-skills.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedSkillsComponent', () => {
  let component: CpRedSkillsComponent;
  let fixture: ComponentFixture<CpRedSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CpRedSkillsComponent],
    imports: [CpRedSkillsModule,
        CommonUiModule,
        BrowserAnimationsModule,
        PipesModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
