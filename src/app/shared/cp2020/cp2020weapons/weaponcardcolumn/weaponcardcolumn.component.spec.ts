import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeaponGroup } from '../../../cp2020/cp2020weapons/models';
import { WeaponcardComponent } from './../weaponcard/weaponcard.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponcardcolumnComponent } from './weaponcardcolumn.component';

describe('WeaponcardcolumnComponent', () => {
  let component: WeaponcardcolumnComponent;
  let fixture: ComponentFixture<WeaponcardcolumnComponent>;

  const weaponGroup: WeaponGroup[] = [{
    name: 'group 1',
    id: 'group1',
    guns: [
      {
        name: 'testGun1',
        type: 'g',
        wa: '0',
        conc: 'P',
        avail: 'E',
        ammo: '9mm(2d6+1)',
        rof: '3',
        shots: '10',
        rel: 'UR',
        cost: '10',
        notes: 'testing'
      },
      {
        name: 'testGun2',
        type: 'g',
        wa: '0',
        conc: 'P',
        avail: 'E',
        ammo: '9mm(2d6+1)',
        rof: '3',
        shots: '10',
        rel: 'UR',
        cost: '10',
        notes: 'testing'
      }
    ]},
    {
      name: 'group 2',
      id: 'group2',
      guns: [
        {
          name: 'testGun3',
          type: 'g',
          wa: '0',
          conc: 'P',
          avail: 'E',
          ammo: '9mm(2d6+1)',
          rof: '3',
          shots: '10',
          rel: 'UR',
          cost: '10',
          notes: 'testing'
        },
        {
          name: 'testGun4',
          type: 'g',
          wa: '0',
          conc: 'P',
          avail: 'E',
          ammo: '9mm(2d6+1)',
          rof: '3',
          shots: '10',
          rel: 'UR',
          cost: '10',
          notes: 'testing'
        }
      ]}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeaponcardcolumnComponent,
        WeaponcardComponent
      ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponcardcolumnComponent);
    component = fixture.componentInstance;
    component.weapons = weaponGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have weapon group', () => {
    expect(component.weapons).toBeTruthy();
    expect(component.weapons.length).toEqual(2);
    expect(component.weapons[0].name).toEqual('group 1');
    expect(component.weapons[1].name).toEqual('group 2');
    expect(component.weapons[0].guns.length).toEqual(2);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
