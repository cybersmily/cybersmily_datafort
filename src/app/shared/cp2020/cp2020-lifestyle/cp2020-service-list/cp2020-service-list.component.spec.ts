import { DataService } from './../../../services/file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ServiceListComponent } from './cp2020-service-list.component';

describe('Cp2020ServiceListComponent', () => {
  let component: Cp2020ServiceListComponent;
  let fixture: ComponentFixture<Cp2020ServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ServiceListComponent ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
