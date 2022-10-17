import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpRedRolesModule } from './../../cp-red-roles.module';

import { CpRedRoleDisplayComponent } from './cp-red-role-display.component';

describe('CpRedRoleDisplayComponent', () => {
  let component: CpRedRoleDisplayComponent;
  let fixture: ComponentFixture<CpRedRoleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedRoleDisplayComponent],
      imports: [CpRedRolesModule, CommonUiModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedRoleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
