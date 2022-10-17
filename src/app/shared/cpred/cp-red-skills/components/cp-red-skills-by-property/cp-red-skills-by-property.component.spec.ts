import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsByPropertyComponent } from './cp-red-skills-by-property.component';

describe('CpRedSkillsByPropertyComponent', () => {
  let component: CpRedSkillsByPropertyComponent;
  let fixture: ComponentFixture<CpRedSkillsByPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedSkillsByPropertyComponent],
      imports: [CommonUiModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsByPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
