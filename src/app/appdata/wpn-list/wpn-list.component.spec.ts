import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { WeaponDataService } from './../../shared/cp2020/cp2020weapons/services';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WpnListComponent } from './wpn-list.component';

describe('WpnListComponent', () => {
  let component: WpnListComponent;
  let fixture: ComponentFixture<WpnListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WpnListComponent],
      imports: [
        CommonUiModule,
        HttpClientTestingModule,
        PipesModule],
      providers: [DataService, WeaponDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
