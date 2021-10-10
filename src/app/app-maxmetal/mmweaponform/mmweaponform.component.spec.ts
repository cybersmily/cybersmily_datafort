import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MaxmetalService } from './../../shared/cp2020/cp2020-vehicles/services';
import { DataService } from './../../shared/services/file-services';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmweaponformComponent } from './mmweaponform.component';

describe('MmmweaponformComponent', () => {
  let component: MmweaponformComponent;
  let fixture: ComponentFixture<MmweaponformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MmweaponformComponent ],
      imports: [
        CommonUiModule,
        HttpClientModule
      ],
      providers: [
        DataService,
        MaxmetalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmweaponformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
