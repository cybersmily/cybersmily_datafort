import { DiceService } from './../../shared/services/dice/dice.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FashionGeneratorComponent } from './fashion-generator.component';
import { DataService } from './../../shared/services/file-services';
import { Cp2020ArmorPiece, ArmorAttributeLists } from '../../shared/cp2020/cp2020-armor/models';
import { of } from 'rxjs';

describe('FashionGeneratorComponent', () => {
  let component: FashionGeneratorComponent;
  let fixture: ComponentFixture<FashionGeneratorComponent>;
  let pieceOfClothing: Cp2020ArmorPiece;
  let clothingList: ArmorAttributeLists;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FashionGeneratorComponent,
        FashionListComponent,
        FashionInputComponent
       ],
       imports: [
         CommonUiModule,
         HttpClientTestingModule
        ],
       providers: [
         DataService,
         DiceService,
         SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionGeneratorComponent);
    component = fixture.componentInstance;
    pieceOfClothing = new Cp2020ArmorPiece();
    pieceOfClothing.clothes = {name: 'test', cost: 0, wt: '0', loc: 'all'};
    pieceOfClothing.type = {name: 'testType', mod: 0};
    pieceOfClothing.style = {name: 'testStyle', mod: 0};
    pieceOfClothing.quality = {name: 'testQualtiy', mod: 0};
    pieceOfClothing.ev = 0;
    pieceOfClothing.cost = 0;
    pieceOfClothing.options = new Array<any>();
    clothingList = {
      clothes: [
        { name: 'leatherwaist', cost: 10, wt: 'Lt', leather: 1.5, loc: 'waist'},
        { name: 'bodyarms', cost: 15, wt: 'Lt', loc: 'body|arms'},
        { name: 'leatherfeet', cost: 25, wt: 'Med', leather: 1.5, loc: 'feet'}
      ],
      styles: [
        { name: 'teststyle1', mod: 1, desc: ''},
        { name: 'teststyle2', mod: 2, desc: ''}
      ],
      qualities: [
        { name: 'testquality1', mod: 1, desc: ''},
        { name: 'testquality2', mod: 2, desc: '', effect: 'generic effect'}
      ],
      armorChart: [
        { name: 'SP 4', sp: 4,
          mod: { Lt : 1.1, Med : 1.05, Hvy : 1.0 },
          ev: { Lt: 0, Med: 0, Hvy: 0 }
        },
        { name: 'SP 6', sp: 6,
          mod: { Lt: 1.2, Med: 1.1, Hvy: 1.05},
          ev: { Lt: 0, Med: 0, Hvy: 0}
        }
      ],
      options: [
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
    expect(component.isListEmpty).toBeTruthy();
    component.addToList(pieceOfClothing);
    expect(component.isListEmpty).toBeFalsy();
  });

  it('should not be empty', () => {
    component.clothingList = [];
    component.addToList(pieceOfClothing);
    expect(component.isListEmpty).toBeFalsy();
  });

  it('should have clothingData instantiated', () => {
    expect(component.clothingData).toBeTruthy();
    expect(component.clothingData.clothes).toBeTruthy();
    expect(Array.isArray(component.clothingData.clothes)).toBeTruthy();
    expect(component.clothingData.styles).toBeTruthy();
    expect(Array.isArray(component.clothingData.styles)).toBeTruthy();
    expect(component.clothingData.qualities).toBeTruthy();
    expect(Array.isArray(component.clothingData.qualities)).toBeTruthy();
    expect(component.clothingData.armorChart).toBeTruthy();
    expect(Array.isArray(component.clothingData.armorChart)).toBeTruthy();
    expect(component.clothingData.options).toBeTruthy();
    expect(Array.isArray(component.clothingData.options)).toBeTruthy();
  });

  it('should load clothing data', () => {
    const dataService = new DataService(null);
    const seo = new SeoService( null, null, null);
    spyOn(seo, 'updateMeta').and.returnValue(undefined);
    spyOn(dataService, 'GetAppDataClothes').and.returnValue(of(clothingList));
    const genComponent = new FashionGeneratorComponent(dataService, null, seo);
    genComponent.ngOnInit();
    expect(genComponent.clothingData).toBeTruthy();
    expect(genComponent.clothingData.clothes).toBeTruthy();
    expect(genComponent.clothingData.clothes.length).toEqual(3);
    expect(genComponent.clothingData.styles.length).toEqual(2);
    expect(genComponent.clothingData.qualities.length).toEqual(2);
    expect(genComponent.clothingData.armorChart.length).toEqual(2);
    expect(genComponent.clothingData.options.length).toEqual(4);
  });
  it('should sort Clothes data', () => {
    const genComponent = new FashionGeneratorComponent(null, null, null);
    genComponent.parseClothingData(clothingList);

    expect(genComponent.clothingData).toBeTruthy();
    expect(genComponent.clothingData.clothes.length).toEqual(3);
    expect(genComponent.clothingData.clothes[0].name).toEqual('bodyarms');
    expect(genComponent.clothingData.clothes[1].name).toEqual('leatherfeet');
    expect(genComponent.clothingData.clothes[2].name).toEqual('leatherwaist');

  });
});
