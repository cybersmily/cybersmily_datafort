import { SeoService } from './../../shared/services/seo/seo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FashionOptionsSelectorComponent } from './../fashion-options-selector/fashion-options-selector.component';
import { FashionSelectorComponent } from './../fashion-selector/fashion-selector.component';
import { FashionClothesSelectorComponent } from './../fashion-clothes-selector/fashion-clothes-selector.component';
import { FashionInputComponent } from './../fashion-input/fashion-input.component';
import { FashionListComponent } from './../fashion-list/fashion-list.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionGeneratorComponent } from './fashion-generator.component';
import { DataService } from './../../shared/services/data.service';
import { Clothing, ClothingLists } from '../../shared/models/clothing';
import { of } from 'rxjs';

describe('FashionGeneratorComponent', () => {
  let component: FashionGeneratorComponent;
  let fixture: ComponentFixture<FashionGeneratorComponent>;
  let pieceOfClothing: Clothing;
  let clothingList: ClothingLists;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FashionGeneratorComponent,
        FashionListComponent,
        FashionInputComponent,
        FashionClothesSelectorComponent,
        FashionSelectorComponent,
        FashionOptionsSelectorComponent
       ],
       imports: [
         FormsModule,
         HttpClientTestingModule
        ],
       providers: [
         DataService,
         SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionGeneratorComponent);
    component = fixture.componentInstance;
    pieceOfClothing = {
      clothes: {name: 'test', cost: 0, wt: '0', loc: 'all'},
      type: {name: 'testType', mod: 0},
      style: {name: 'testStyle', mod: 0},
      quality: {name: 'testQualtiy', mod: 0},
      spRating: {name: 'test', mod: 0, sp: 0, ev: 0},
      ev: 0,
      totalCost: 0,
      options: []
    };
    clothingList = {
      Clothes: [
        { name: 'leatherwaist', cost: 10, wt: 'Lt', leather: 1.5, loc: 'waist'},
        { name: 'bodyarms', cost: 15, wt: 'Lt', loc: 'body|arms'},
        { name: 'leatherfeet', cost: 25, wt: 'Med', leather: 1.5, loc: 'feet'}
      ],
      Style: [
        { name: 'teststyle1', mod: 1, desc: ''},
        { name: 'teststyle2', mod: 2, desc: ''}
      ],
      Quality: [
        { name: 'testquality1', mod: 1, desc: ''},
        { name: 'testquality2', mod: 2, desc: '', effect: 'generic effect'}
      ],
      Armoring: [
        { name: 'SP 4', sp: 4,
          mod: { Lt : 1.1, Med : 1.05, Hvy : 1.0 },
          ev: { Lt: 0, Med: 0, Hvy: 0 }
        },
        { name: 'SP 6', sp: 6,
          mod: { Lt: 1.2, Med: 1.1, Hvy: 1.05},
          ev: { Lt: 0, Med: 0, Hvy: 0}
        }
      ],
      Options: [
        { name: 'test', mod: { Lt: 4.0, Med: 3.0, Hvy : 1.5}, desc: '', effect: 'test effect'},
        { name: 'test3', mod: 3, desc: '', effect: 'test effect'},
        { name: 'test2', mod: 2, desc: '', effect: 'test effect'},
        { name: 'test5', mod: 5, desc: '', effect: 'test effect'}
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty', () => {
    component.clothingList = [];
    expect(component.isListEmpty()).toBeTruthy();
    component.addToList(pieceOfClothing);
    expect(component.isListEmpty()).toBeFalsy();
  });

  it('should not be empty', () => {
    component.clothingList = [];
    component.addToList(pieceOfClothing);
    expect(component.isListEmpty()).toBeFalsy();
  });

  it('should have clothingData instantiated', () => {
    expect(component.clothingData).toBeTruthy();
    expect(component.clothingData.Clothes).toBeTruthy();
    expect(Array.isArray(component.clothingData.Clothes)).toBeTruthy();
    expect(component.clothingData.Style).toBeTruthy();
    expect(Array.isArray(component.clothingData.Style)).toBeTruthy();
    expect(component.clothingData.Quality).toBeTruthy();
    expect(Array.isArray(component.clothingData.Quality)).toBeTruthy();
    expect(component.clothingData.Armoring).toBeTruthy();
    expect(Array.isArray(component.clothingData.Armoring)).toBeTruthy();
    expect(component.clothingData.Options).toBeTruthy();
    expect(Array.isArray(component.clothingData.Options)).toBeTruthy();
  });

  it('should load clothing data', () => {
    const dataService = new DataService(null);
    const seo = new SeoService( null, null, null);
    spyOn(seo, 'updateMeta').and.returnValue(undefined);
    spyOn(dataService, 'GetAppDataClothes').and.returnValue(of(clothingList));
    const genComponent = new FashionGeneratorComponent(dataService, null, seo);
    genComponent.ngOnInit();
    expect(genComponent.clothingData).toBeTruthy();
    expect(genComponent.clothingData.Clothes).toBeTruthy();
    expect(genComponent.clothingData.Clothes.length).toEqual(3);
    expect(genComponent.clothingData.Style.length).toEqual(2);
    expect(genComponent.clothingData.Quality.length).toEqual(2);
    expect(genComponent.clothingData.Armoring.length).toEqual(2);
    expect(genComponent.clothingData.Options.length).toEqual(4);
  });
  it('should sort Clothes data', () => {
    const genComponent = new FashionGeneratorComponent(null, null, null);
    genComponent.parseClothingData(clothingList);

    expect(genComponent.clothingData).toBeTruthy();
    expect(genComponent.clothingData.Clothes.length).toEqual(3);
    expect(genComponent.clothingData.Clothes[0].name).toEqual('bodyarms');
    expect(genComponent.clothingData.Clothes[1].name).toEqual('leatherfeet');
    expect(genComponent.clothingData.Clothes[2].name).toEqual('leatherwaist');

  });
});
