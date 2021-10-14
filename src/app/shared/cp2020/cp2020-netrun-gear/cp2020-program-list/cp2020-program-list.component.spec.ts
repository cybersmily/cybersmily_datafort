import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../../services/file-services/data.service';
import { Cp2020ProgramNewComponent } from '../cp2020-program-new/cp2020-program-new.component';
import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020ProgramListComponent } from './cp2020-program-list.component';

describe('ProgramListComponent', () => {
  let component: Cp2020ProgramListComponent;
  let fixture: ComponentFixture<Cp2020ProgramListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        Cp2020ProgramListComponent,
        Cp2020ProgramNewComponent
      ],
      providers: [
        DataService
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
