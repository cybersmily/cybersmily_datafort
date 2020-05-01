import { BsModalService, ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NrinstructComponent } from './nrinstruct.component';

describe('NrinstructComponent', () => {
  let component: NrinstructComponent;
  let fixture: ComponentFixture<NrinstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrinstructComponent
      ],
      imports: [
        ModalModule.forRoot()
      ],
      providers: [
        BsModalService,
        BsModalRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrinstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
