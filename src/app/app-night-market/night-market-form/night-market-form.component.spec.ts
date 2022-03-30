import { NightMarketEntry, NightMarketListing, NightMarketCategory } from '../../shared/cpred/c-p-red-economy/models';
import { of } from 'rxjs';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightMarketFormComponent } from './night-market-form.component';

describe('NightMarketFormComponent', () => {
  let component: NightMarketFormComponent;
  let dataService: DataService;
  let diceService: DiceService;
  let fixture: ComponentFixture<NightMarketFormComponent>;
  let itemList: Array<NightMarketCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightMarketFormComponent ],
      imports: [CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightMarketFormComponent);
    itemList = new Array<NightMarketCategory>();
    itemList.push({name: 'category1', chart: [
      {name: 'item1', weight: 0, price: 100},
      {name: 'item2', weight: 0, price: 100},
      {name: 'item3', weight: 0, price: 100},
      {name: 'item4', weight: 0, price: 100},
      {name: 'item5', weight: 0, price: 100},
      {name: 'item6', weight: 0, price: 100},
      {name: 'item7', weight: 0, price: 100},
      {name: 'item8', weight: 0, price: 100},
      {name: 'item9', weight: 0, price: 100},
      {name: 'item0', weight: 0, price: 100}
    ]});
    itemList.push({name: 'category2', chart: [
      {name: 'item21', weight: 0, price: 100},
      {name: 'item22', weight: 0, price: 100},
      {name: 'item23', weight: 0, price: 100},
      {name: 'item24', weight: 0, price: 100},
      {name: 'item25', weight: 0, price: 100},
      {name: 'item26', weight: 0, price: 100},
      {name: 'item27', weight: 0, price: 100},
      {name: 'item28', weight: 0, price: 100},
      {name: 'item29', weight: 0, price: 100},
      {name: 'item20', weight: 0, price: 100}
    ]});
    itemList.push({name: 'category3', chart: [
      {name: 'item31', weight: 0, price: 100},
      {name: 'item32', weight: 0, price: 100},
      {name: 'item33', weight: 0, price: 100},
      {name: 'item34', weight: 0, price: 100},
      {name: 'item35', weight: 0, price: 100},
      {name: 'item36', weight: 0, price: 100},
      {name: 'item37', weight: 0, price: 100},
      {name: 'item38', weight: 0, price: 100},
      {name: 'item39', weight: 0, price: 100},
      {name: 'item30', weight: 0, price: 100}
    ]});
    dataService = TestBed.inject(DataService);
    diceService = TestBed.inject(DiceService);
    spyOn(dataService, 'GetJson').and.returnValue(of({charts: itemList}));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generate()', () => {
    it('should generate two categories', () => {
      component.generate();
      expect(component['_itemList']).toBeTruthy();
      expect(component['_itemList']?.length).toEqual(2);
      expect(component['_itemList'][0]?.items.length).toBeGreaterThanOrEqual(1);
      expect(component['_itemList'][1]?.items.length).toBeGreaterThanOrEqual(1);
    });

    it('should generate max number items for each category', () => {
      component.randomRollNoItems = false;
      component.numberOfItems = 11;
      component.generate();
      expect(component['_itemList']).toBeTruthy();
      expect(component['_itemList']?.length).toEqual(2);
      expect(component['_itemList'][0]?.items.length).toEqual(10);
      expect(component['_itemList'][1]?.items.length).toEqual(10);
    });

    it('should generate max number items for each category', () => {
      component.randomRollNoItems = false;
      component.numberOfItems = 11;
      component.generate();
      expect(component['_itemList']).toBeTruthy();
      expect(component['_itemList']?.length).toEqual(2);
      expect(component['_itemList'][0].items.length).toEqual(10);
      expect(component['_itemList'][1].items.length).toEqual(10);
    });

    it('should generate minimum of 1 item for each category', () => {
      component.randomRollNoItems = false;
      component.numberOfItems = 0;
      component.generate();
      expect(component['_itemList']).toBeTruthy();
      expect(component['_itemList'].length).toEqual(2);
      expect(component['_itemList'][0].items.length).toEqual(1);
      expect(component['_itemList'][1].items.length).toEqual(1);
    });
  });
});
