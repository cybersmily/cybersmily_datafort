import { NightMarketEntry, NightMarketListing, NightMarketCategory } from './../../shared/cpred/models/night-market-chart';
import { of } from 'rxjs';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
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
      {name: 'item5', weight: 0, price: 100}
    ]});
    itemList.push({name: 'category2', chart: [
      {name: 'item1', weight: 0, price: 100},
      {name: 'item2', weight: 0, price: 100},
      {name: 'item3', weight: 0, price: 100},
      {name: 'item4', weight: 0, price: 100},
      {name: 'item5', weight: 0, price: 100}
    ]});
    itemList.push({name: 'category3', chart: [
      {name: 'item1', weight: 0, price: 100},
      {name: 'item2', weight: 0, price: 100},
      {name: 'item3', weight: 0, price: 100},
      {name: 'item4', weight: 0, price: 100},
      {name: 'item5', weight: 0, price: 100}
    ]});
    itemList.push({name: 'category4', chart: [
      {name: 'item1', weight: 0, price: 100},
      {name: 'item2', weight: 0, price: 100},
      {name: 'item3', weight: 0, price: 100},
      {name: 'item4', weight: 0, price: 100},
      {name: 'item5', weight: 0, price: 100}
    ]});
    itemList.push({name: 'category5', chart: [
      {name: 'item1', weight: 0, price: 100},
      {name: 'item2', weight: 0, price: 100},
      {name: 'item3', weight: 0, price: 100},
      {name: 'item4', weight: 0, price: 100},
      {name: 'item5', weight: 0, price: 100}
    ]});
    dataService = TestBed.inject(DataService);
    diceService = TestBed.inject(DiceService);
    spyOn(dataService, 'GetJson').and.returnValue(of({charts: itemList}));
    spyOn(diceService, 'generateNumber').and.returnValue(2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.charts).toBeTruthy();
    expect(component.charts.length).toEqual(5);
  });

  describe('generate()', () => {
    it('should generate two categories', () => {
      component.generate();
      expect(component.itemList).toBeTruthy();
      expect(component.itemList.length).toEqual(2);
    });
  });

  describe('rollTable()', () => {
    it('should generate Nigh Market entry', () => {
      const listing = component.rollTable();
      expect(listing).toBeTruthy();
      expect(listing.items.length).toEqual(2);
    });
  });
});
