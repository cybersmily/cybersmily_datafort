import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services/data.service';
import { SaveFileService } from './../../shared/services/file-services';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCyberListComponent } from './admin-cyber-list.component';

describe('AdminCyberListComponent', () => {
  let component: AdminCyberListComponent;
  let fixture: ComponentFixture<AdminCyberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminCyberListComponent
      ],
      imports: [
        HttpClientModule,
        CommonUiModule,
        PipesModule
      ],
      providers: [
        SaveFileService,
        DataService
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
