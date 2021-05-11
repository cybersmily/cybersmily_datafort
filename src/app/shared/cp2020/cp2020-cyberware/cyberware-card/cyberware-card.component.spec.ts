import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { DataCyberware } from './../models';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberwareCardComponent } from './cyberware-card.component';

describe('CyberwareCardComponent', () => {
  let component: CyberwareCardComponent;
  let fixture: ComponentFixture<CyberwareCardComponent>;
  const cyberware: DataCyberware = {
    type: 'Neuralware',
    subtype: 'chipware',
    name: 'test cyberware',
    abbrev: 'tst',
    numOptions: undefined,
    hc: '1d6/3',
    desc: 'This is a test',
    notes: 'Game notes',
    cost: 1002,
    surgery: 'MA',
    source: {book: 'CP2020', page: 12}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyberwareCardComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberwareCardComponent);
    component = fixture.componentInstance;
    component.cyberware = cyberware;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
