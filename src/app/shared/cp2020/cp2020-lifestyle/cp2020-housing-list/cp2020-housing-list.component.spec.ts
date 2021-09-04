import { Cp2020Housing } from './../models/cp2020-housing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cp2020HousingListComponent } from './cp2020-housing-list.component';
import { CpHousing } from '../models';

describe('Cp2020HousingListComponent', () => {
  let component: Cp2020HousingListComponent;
  let fixture: ComponentFixture<Cp2020HousingListComponent>;
  let housingList: Array<CpHousing>;
  let housing1: Cp2020Housing;
  let housing2: Cp2020Housing;
  let housing3: Cp2020Housing;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2020HousingListComponent],
      imports: [CommonUiModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020HousingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    housingList = [
      {name: 'test1', cost: 200, qualityMod: 1, rooms: 1, contents: ['item1','item2'], utilities: [], count: 1, desc: '', quality: '', location: ''},
      {name: 'test2', cost: 200, qualityMod: 1, rooms: 4, contents: ['item1','item2'], utilities: [], count: 1, desc: '', quality: '', location: ''},
      {name: 'test3', cost: 500, qualityMod: 2, rooms: 2, contents: ['item1','item2'], utilities: [], count: 1, desc: '', quality: '', location: ''}
    ];
    housing1 = new Cp2020Housing(housingList[0]);
    housing2 = new Cp2020Housing(housingList[1]);
    housing3 = new Cp2020Housing(housingList[2]);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should OnInit', () => {
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
      expect(component.currHousing).toBeTruthy();
      expect(component.currHousing.length).toEqual(housingList.length);
      expect(component.currHousing[0].name).toEqual(housingList[0].name);
    });

    it('should OnChanges', () => {
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
      housingList.push(housing3);
      component.ngOnChanges();
      fixture.autoDetectChanges();
      expect(component.currHousing.length).toEqual(housingList.length);
      expect(component.currHousing[3]).toBeTruthy();
      expect(component.currHousing[3].name).toEqual(housingList[3].name);
    });
  });

  describe('properties', () => {
    beforeEach(()=>{
      component.currHousing.push(housing1);
      component.currHousing.push(housing2);
      component.currHousing.push(housing3);
      component.selectedHousing = housing1;
    });

    it('should get totalCost', () => {
      const sum = housing1.totalCost + housing2.totalCost + housing3.totalCost;
      expect(component.totalCost).toEqual(sum);
    });

    it('should get contentColTwoIndex', () => {
      expect(component.contentColTwoIndex).toEqual(1);
    });

    it('should get contentColOne', () => {
      expect(component.contentColOne.length).toEqual(1);
      expect(component.contentColOne[0]).toEqual(component.selectedHousing.contents[0]);
    });

    it('should get contentColTwo', () => {
      expect(component.contentColTwo.length).toEqual(1);
      expect(component.contentColTwo[0]).toEqual(component.selectedHousing.contents[1]);
    });

  });

  describe('refreshSelected()', () => {
    it('should reset selected', () => {
      component.selectedHousing = housing2;
      component.selectedIndex = 1;
      expect(component.selectedHousing).toBeTruthy();
      expect(component.selectedHousing.name).toEqual(housing2.name);
      expect(component.selectedIndex).toEqual(1);
      component.refreshSelected();
      expect(component.selectedHousing).toBeTruthy();
      expect(component.selectedHousing.name).toEqual('');
      expect(component.selectedIndex).toEqual(-1);
    });
  });

  describe('add()', () => {
    it('should reset selectedHousing', () => {
      component.selectedHousing = housing2;
      component.selectedIndex = 1;
      expect(component.selectedHousing).toBeTruthy();
      expect(component.selectedHousing.name).toEqual(housing2.name);
      expect(component.selectedIndex).toEqual(1);
      component.add(undefined);
      expect(component.selectedHousing).toBeTruthy();
      expect(component.selectedHousing.name).toEqual('');
      expect(component.selectedIndex).toEqual(-1);
    });

  });

  describe('addContent', () => {
    it('should add Content to selectedHousing', () => {
      const count = housing2.contents.length;
      component.selectedHousing = housing2;
      component.newContent = 'Item3';
      component.addContent();
      expect(component.selectedHousing.contents.length).toEqual(count + 1);
      expect(component.selectedHousing.contents.includes('Item3')).toBeTrue();
    });
    it('should not add Content to selectedHousing', () => {
      const count = housing2.contents.length;
      component.selectedHousing = housing2;
      component.newContent = '';
      component.addContent();
      expect(component.selectedHousing.contents.length).toEqual(count);
    });
  });

  describe('edit()', () => {
    it('should edit should set selected', () => {
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
      expect(component.selectedIndex).toEqual(-1);
      expect(component.selectedHousing.name).toEqual('');
      component.edit(1, undefined);
      expect(component.selectedHousing.name).toEqual(housingList[1].name);
      expect(component.selectedIndex).toEqual(1);

    });
  });

  describe('delete()', () => {
    it('should delete selected index', () => {
      const count = housingList.length;
      component.housingList = housingList;
      component.selectedHousing = housing3;
      component.selectedIndex = 2;
      component.ngOnInit();
      fixture.autoDetectChanges();
      component.delete(2);
      fixture.autoDetectChanges();
      expect(component.currHousing.length).toEqual(count - 1);
      expect(component.selectedIndex).toEqual(-1);
      expect(component.selectedHousing.name).toEqual('');

    });

    it('should not delete selected index', () => {
      const count = housingList.length;
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
      component.selectedHousing = housing3;
      const name = housing3.name;
      component.selectedIndex = 2;
      component.delete(-1);
      expect(component.currHousing.length).toEqual(count);
      expect(component.selectedIndex).toEqual(2);
      expect(component.selectedHousing.name).toEqual(name);
      component.delete(3);
      expect(component.currHousing.length).toEqual(count);
      expect(component.selectedIndex).toEqual(2);
      expect(component.selectedHousing.name).toEqual(name);
    });
  });

  describe('deleteContent()', () => {
    it('should not delete content from selectedHousing', () => {
      const count = housing2.contents.length;
      component.selectedHousing = housing2;
      component.deleteContent(-1);
      expect(component.selectedHousing.contents.length).toEqual(count);
      component.deleteContent(4);
      expect(component.selectedHousing.contents.length).toEqual(count);
    });
    it('should delete content from selectedHousing', () => {
      const count = housing2.contents.length;
      component.selectedHousing = housing2;
      component.deleteContent(1);
      expect(component.selectedHousing.contents.length).toEqual(count - 1);
      component.deleteContent(0);
      expect(component.selectedHousing.contents.length).toEqual(0);
      component.deleteContent(0);
      expect(component.selectedHousing.contents.length).toEqual(0);
    });
  });

  describe('toggleUtility()', () => {
    it('should toggle the count for utilitiies', () => {
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
      const toggle = component.selectedHousing.utilities[0].count;
      component.toggleUtility(undefined, 0);
      expect(component.selectedHousing.utilities[0].count).not.toEqual(toggle);
    });
  });

  describe('getUtlitySelected()', () => {
    it('should be true if utility was toggled', () => {
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
      component.toggleUtility(undefined, 0);
      expect(component.getUtilitySelected(0)).toBeTrue();
    });
  });

  describe('saveHousing()', () => {
    const name = 'New Housing Added';
    beforeEach(() => {
      component.housingList = housingList;
      component.ngOnInit();
      fixture.autoDetectChanges();
    });

    it('should add housing to currHousing if index is -1', () => {
      component.selectedHousing.name = name;
      component.saveHousing();
      expect(component.currHousing.length).toEqual(housingList.length + 1);
      const added = component.currHousing.find(housing => housing.name === name);
      expect(added).toBeTruthy();
    });

    it('should add housing to currHousing if index over bounds', () => {
      component.selectedHousing.name = name;
      component.selectedIndex = 5;
      component.saveHousing();
      expect(component.currHousing.length).toEqual(housingList.length + 1);
      const added = component.currHousing.find(housing => housing.name === name);
      expect(added).toBeTruthy();
    });

    it('should edit housing to currHousing if index is in bounds', () => {
      component.selectedHousing = housing2;
      component.selectedHousing.name = name;
      component.selectedIndex = 1;
      component.saveHousing();
      expect(component.currHousing.length).toEqual(housingList.length);
      const added = component.currHousing.find(housing => housing.name === name);
      expect(added).toBeTruthy();
      expect(component.currHousing[component.selectedIndex].name).toEqual(name);
    });
  });

});
