import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { DeckFormComponent } from './../deck-form/deck-form.component';
import { ProgramNewComponent } from './../program-new/program-new.component';
import { ProgramListComponent } from './../program-list/program-list.component';
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
        ProgramListComponent,
        ProgramNewComponent,
        DeckFormComponent
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
