import { DataWeapon } from './../../shared/cp2020/cp2020weapons/models/data-weapon';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { WeaponDataService } from './../../shared/cp2020/cp2020weapons/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminWpnListComponent } from './admin-wpn-list.component';
import { DataService } from './../../shared/services/file-services';
import { PipesModule } from './../../shared/pipes/pipes.module';

describe('AdminWpnListComponent', () => {
  let component: AdminWpnListComponent;
  let fixture: ComponentFixture<AdminWpnListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminWpnListComponent],
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
    const wpnList: Array<DataWeapon> = [
      { name: 'weapon1', type: 'P', category: 'EXOTICS', subcategory: '', wa: -1, conc: 'J', avail: 'P', damage: 'Tangle', ammo: '15mm', shots: 4, rof: 1, rel: 'ST', range: 25, cost: 200, source: { book: 'BH', page: 6 } },
      { name: 'weapon2', type: 'RIF', category: 'EXOTICS', subcategory: '', wa: 0, conc: 'N', avail: 'C', damage: '3d6', ammo: '', ap: '1/2', shots: 9, rof: 2, rel: 'VR', range: 100, cost: 750, source: { book: 'SF', page: 34 } }
    ];
    expect(component).toBeTruthy();
  });
});
