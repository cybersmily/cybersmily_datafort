import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { CpRedRolesModule } from './../../cp-red-roles.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedRolesDisplayComponent } from './cp-red-roles-display.component';

describe('CpRedRolesDisplayComponent', () => {
  let component: CpRedRolesDisplayComponent;
  let fixture: ComponentFixture<CpRedRolesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedRolesDisplayComponent],
      imports: [CpRedRolesModule, CommonUiModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedRolesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
