import { CommonUiModule } from './../../common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcProfileModalComponent } from './npcprofilemodal.component';
import { DataService } from './../../../services/data.service';

describe('NpcProfileComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcProfileModalComponent
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


  it('should create', () => {
    // expect(component).toBeTruthy();
  });

  afterAll(() => {
  TestBed.resetTestingModule();
});
});
