import { CyberDataService } from './../../shared/cp2020/cp2020-cyberware/services/cyber-data.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { SaveFileService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCyberListComponent } from './admin-cyber-list.component';

describe('AdminCyberListComponent', () => {
  let component: AdminCyberListComponent;
  let fixture: ComponentFixture<AdminCyberListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        AdminCyberListComponent
    ],
    imports: [CommonUiModule,
        PipesModule],
    providers: [
        SaveFileService,
        DataService,
        CyberDataService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCyberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
