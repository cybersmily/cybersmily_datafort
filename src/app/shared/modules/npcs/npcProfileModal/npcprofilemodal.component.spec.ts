import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsModalService, ModalModule, BsModalRef  } from 'ngx-bootstrap/modal';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcProfileModalComponent } from './npcprofilemodal.component';
import { DataService } from './../../../services/data.service';

describe('NpcProfileComponent', () => {
  let component: NpcProfileModalComponent;
  let fixture: ComponentFixture<NpcProfileModalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcProfileModalComponent
      ],
      providers: [
        BsModalService,
        BsModalRef,
        DataService
      ],
      imports: [
        ModalModule.forRoot(),
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
