import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { WeaponDataService } from './../../shared/cp2020/cp2020weapons/services';
import { DataService } from './../../shared/services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WpnListComponent } from './wpn-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WpnListComponent', () => {
  let component: WpnListComponent;
  let fixture: ComponentFixture<WpnListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [WpnListComponent],
    imports: [CommonUiModule,
        PipesModule],
    providers: [DataService, WeaponDataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
