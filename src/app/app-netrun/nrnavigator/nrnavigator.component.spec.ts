import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrnavigatorComponent } from './nrnavigator.component';
import { DataService } from './../../shared/services/file-services/data.service';

describe('NrnavigatorComponent', () => {
  let component: NrnavigatorComponent;
  let fixture: ComponentFixture<NrnavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrnavigatorComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrnavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
