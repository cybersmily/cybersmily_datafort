import { CommonUiModule } from './../../common-ui/common-ui.module';
import { CyberwareCardComponent } from './../cyberware-card/cyberware-card.component';
import { DataCyberware } from './../../../models/cyberware';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberwareCardColumnComponent } from './cyberware-card-column.component';

describe('CyberwareCardColumnComponent', () => {
  let component: CyberwareCardColumnComponent;
  let fixture: ComponentFixture<CyberwareCardColumnComponent>;
  const cyberware: DataCyberware[] = [
    {
      type: 'Neuralware',
      subtype: 'chipware',
      name: 'test cyberware1',
      abbrev: 'tst1',
      hc: '1d6/3',
      desc: 'This is a test',
      cost: 1002,
      surgery: 'MA',
      notes: 'Game notes',
      source: {book: 'CP2020', page: 12}
    },
    {
      type: 'Neuralware',
      subtype: 'chipware',
      name: 'test cyberware2',
      abbrev: 'tst2',
      hc: '1d6',
      desc: 'This is a test',
      cost: 10,
      surgery: 'M',
      notes: 'Game notes',
      source: {book: 'CP2020', page: 12}
    },
    {
      type: 'Neuralware',
      subtype: 'chipware',
      name: 'test cyberware3',
      abbrev: 'tst3',
      hc: '3',
      desc: 'This is a test',
      cost: 0.2,
      surgery: 'S',
      notes: 'Game notes',
      source: {book: 'CP2020', page: 12}
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CyberwareCardColumnComponent,
        CyberwareCardComponent
      ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberwareCardColumnComponent);
    component = fixture.componentInstance;
    component.cyberList = cyberware;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
