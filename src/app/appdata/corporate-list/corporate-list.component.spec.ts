import { DataService } from '../../shared/services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from '../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateListComponent } from './corporate-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GearListComponent', () => {
  let component: CorporateListComponent;
  let fixture: ComponentFixture<CorporateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CorporateListComponent],
    imports: [CommonUiModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
