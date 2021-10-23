import { CommonUiModule } from './../../common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NpcProfileModalComponent } from './npcprofilemodal.component';
import { DataService } from './../../../services/file-services';

describe('NpcProfileComponent', () => {
  let component: NpcProfileModalComponent;
  let fixture: ComponentFixture<NpcProfileModalComponent>;

  beforeEach(waitForAsync(() => {
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

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
  TestBed.resetTestingModule();
});
});
