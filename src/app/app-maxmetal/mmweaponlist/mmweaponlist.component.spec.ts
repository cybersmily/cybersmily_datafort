import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MmweaponComponent } from './../mmweapon/mmweapon.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmweaponlistComponent } from './mmweaponlist.component';

describe('MmweaponlistComponent', () => {
  let component: MmweaponlistComponent;
  let fixture: ComponentFixture<MmweaponlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmweaponlistComponent,
        MmweaponComponent
      ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmweaponlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
