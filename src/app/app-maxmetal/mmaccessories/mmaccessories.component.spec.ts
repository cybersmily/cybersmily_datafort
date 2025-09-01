import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmaccessoriesComponent } from './mmaccessories.component';
import { MmweaponComponent } from '../mmweapon/mmweapon.component';
import { MmoptionComponent } from '../mmoption/mmoption.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MmaccessoriesComponent', () => {
  let component: MmaccessoriesComponent;
  let fixture: ComponentFixture<MmaccessoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        MmaccessoriesComponent,
        MmweaponComponent,
        MmoptionComponent
    ],
    imports: [CommonUiModule],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmaccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
