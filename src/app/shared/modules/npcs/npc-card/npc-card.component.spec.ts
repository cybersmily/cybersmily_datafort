import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule, BsModalRef  } from 'ngx-bootstrap/modal';

import { NpcCardComponent } from './npc-card.component';
import { NpcCard } from '../../../models/character';

describe('NpcCardComponent', () => {
  let component: NpcCardComponent;
  let fixture: ComponentFixture<NpcCardComponent>;
  const npc: NpcCard = {
    name: 'test1',
    img: 'test1',
    career: 'fixer'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcCardComponent
      ],
      providers: [
        BsModalService,
        BsModalRef
      ],
      imports: [
        ModalModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcCardComponent);
    component = fixture.componentInstance;
    component.npcCard = npc;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
  TestBed.resetTestingModule();
});
});
