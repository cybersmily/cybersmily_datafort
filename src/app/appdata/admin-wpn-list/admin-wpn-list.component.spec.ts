import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { WeaponDataService } from './../../shared/cp2020/cp2020weapons/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminWpnListComponent } from './admin-wpn-list.component';
import { DataService } from './../../shared/services/file-services/data.service';
import { PipesModule } from './../../shared/pipes/pipes.module';

describe('AdminWpnListComponent', () => {
  let component: AdminWpnListComponent;
  let fixture: ComponentFixture<AdminWpnListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWpnListComponent ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule,
        BrowserAnimationsModule,
        PipesModule
      ],
      providers: [
        WeaponDataService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWpnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
