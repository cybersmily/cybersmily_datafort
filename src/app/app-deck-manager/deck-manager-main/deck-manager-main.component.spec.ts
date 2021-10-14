import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { Cp2020DeckFormComponent } from '../../shared/cp2020/cp2020-netrun-gear/cp2020-deck-form/cp2020-deck-form.component';
import { Cp2020ProgramNewComponent } from '../../shared/cp2020/cp2020-netrun-gear/cp2020-program-new/cp2020-program-new.component';
import { Cp2020ProgramListComponent } from '../../shared/cp2020/cp2020-netrun-gear/cp2020-program-list/cp2020-program-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeckManagerMainComponent } from './deck-manager-main.component';

describe('DeckManagerMainComponent', () => {
  let component: DeckManagerMainComponent;
  let fixture: ComponentFixture<DeckManagerMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeckManagerMainComponent,
        Cp2020ProgramListComponent,
        Cp2020ProgramNewComponent,
        Cp2020DeckFormComponent
      ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule,
        BrowserAnimationsModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckManagerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
