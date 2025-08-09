import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberdeckListComponent } from './cyberdeck-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CyberdeckListComponent', () => {
  let component: CyberdeckListComponent;
  let fixture: ComponentFixture<CyberdeckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CyberdeckListComponent],
    imports: [CommonUiModule,
        PipesModule],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberdeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
