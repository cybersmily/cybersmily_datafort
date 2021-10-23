import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CyberDataService } from './../../shared/cp2020/cp2020-cyberware/services';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CyberListComponent } from './cyber-list.component';

describe('CyberListComponent', () => {
  let component: CyberListComponent;
  let fixture: ComponentFixture<CyberListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CyberListComponent ],
      imports: [
        CommonUiModule,
        HttpClientModule,
        PipesModule
      ],
      providers: [
        DataService,
        CyberDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
