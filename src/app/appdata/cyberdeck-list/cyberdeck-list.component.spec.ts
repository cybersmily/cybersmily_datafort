import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberdeckListComponent } from './cyberdeck-list.component';

describe('CyberdeckListComponent', () => {
  let component: CyberdeckListComponent;
  let fixture: ComponentFixture<CyberdeckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberdeckListComponent ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule,
        PipesModule
      ],
      providers: [
        DataService
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
