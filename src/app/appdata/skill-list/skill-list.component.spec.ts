import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkillListComponent } from './skill-list.component';

describe('SkillListComponent', () => {
  let component: SkillListComponent;
  let fixture: ComponentFixture<SkillListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SkillListComponent],
    imports: [CommonUiModule,
        PipesModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
