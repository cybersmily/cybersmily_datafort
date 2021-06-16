import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtTrckInstructionsComponent } from './cmbt-trck-instructions.component';

describe('CmbtTrckInstructionsComponent', () => {
  let component: CmbtTrckInstructionsComponent;
  let fixture: ComponentFixture<CmbtTrckInstructionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckInstructionsComponent ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
