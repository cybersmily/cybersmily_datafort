import { CommonUiModule } from './../../common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcCardColumnComponent } from './npc-card-column.component';
import { NpcCard } from '../../../models/character';
import { NpcCardComponent } from '../npc-card/npc-card.component';

describe('NpcCardColumnComponent', () => {
  let component: NpcCardColumnComponent;
  let fixture: ComponentFixture<NpcCardColumnComponent>;
  const npcList: NpcCard[] = [
    {
      name: 'test1',
      img: 'test1',
      career: 'fixer'
    },
    {
      name: 'test2',
      img: 'test2',
      career: 'fixer'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcCardColumnComponent,
        NpcCardComponent
      ],
      imports: [
        CommonUiModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcCardColumnComponent);
    component = fixture.componentInstance;
    component.npcList = npcList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
  TestBed.resetTestingModule();
});
});
