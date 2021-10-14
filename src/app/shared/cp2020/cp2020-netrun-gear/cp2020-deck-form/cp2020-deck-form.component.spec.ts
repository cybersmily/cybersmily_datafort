import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../../services/file-services/data.service';
import { NrDeckDataService } from '../../../services/netrun/nr-deck-data.service';
import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020DeckFormComponent } from './cp2020-deck-form.component';

describe('DeckFormComponent', () => {
  let component: Cp2020DeckFormComponent;
  let fixture: ComponentFixture<Cp2020DeckFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020DeckFormComponent ],
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
    fixture = TestBed.createComponent(Cp2020DeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
