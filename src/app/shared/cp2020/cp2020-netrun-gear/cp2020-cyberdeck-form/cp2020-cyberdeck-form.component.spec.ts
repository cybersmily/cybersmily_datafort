import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../../services/file-services/data.service';
import { NrDeckDataService } from '../../../services/netrun/nr-deck-data.service';
import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020CyberdeckFormComponent } from './cp2020-cyberdeck-form.component';

describe('DeckFormComponent', () => {
  let component: Cp2020CyberdeckFormComponent;
  let fixture: ComponentFixture<Cp2020CyberdeckFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020CyberdeckFormComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        NrDeckDataService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberdeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
