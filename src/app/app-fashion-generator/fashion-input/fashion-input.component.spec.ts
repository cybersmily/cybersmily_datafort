import { DiceService } from './../../shared/services/dice/dice.service';
import { ClothingOption, PieceOfClothing, Clothing, ClothingArmor } from './../../shared/models/clothing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FashionOptionsSelectorComponent } from './../fashion-options-selector/fashion-options-selector.component';
import { FashionSelectorComponent } from './../fashion-selector/fashion-selector.component';
import { FashionClothesSelectorComponent } from './../fashion-clothes-selector/fashion-clothes-selector.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FashionInputComponent } from './fashion-input.component';

describe('FashionInputComponent', () => {
  let component: FashionInputComponent;
  let fixture: ComponentFixture<FashionInputComponent>;
  let testPiece: PieceOfClothing;
  let testArrayPieces: Array<PieceOfClothing>;
  let testClothing: Clothing;
  let testOptions: Array<ClothingOption>;
  let testQualities: Array<ClothingOption>;
  let testStyles: Array<ClothingOption>;
  let testArmor: ClothingArmor;
  let testArmorArray: Array<ClothingArmor>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FashionInputComponent,
        FashionClothesSelectorComponent,
        FashionSelectorComponent,
        FashionOptionsSelectorComponent
      ],
      imports: [
        CommonUiModule
      ],
      providers: [
        DiceService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testPiece = { name: 'TestClothing', cost: 0, loc: 'torso', wt: 'Light' };
    testArrayPieces = [
      { name: 'leatherwaist', cost: 10, wt: 'Lt', leather: '1.5', loc: 'waist'},
      { name: 'bodyarms', cost: 15, wt: 'Lt', loc: 'body|arms'},
      { name: 'leatherfeet', cost: 25, wt: 'Med', leather:'1.5', loc: 'feet'}
    ];
    testClothing = new Clothing();
    testClothing.clothes = {name: 'test', cost: 0, wt: '0', loc: 'all'};
    testClothing.type = {name: 'testType', mod: 0};
    testClothing.style = {name: 'testStyle', mod: 0};
    testClothing.quality = {name: 'testQualtiy', mod: 0};
    testClothing.spRating = {name: 'test', mod: 0, sp: 0, ev: 0};
    testClothing.ev = 0;
    testClothing.totalCost = 0;
    testClothing.options = new Array<any>();
    testOptions = [
      { name: 'test', mod: { Lt: 4.0, Med: 3.0, Hvy: 1.5 }, desc: '', effect: 'test effect' },
      { name: 'test3', mod: 3, desc: '', effect: 'test effect' },
      { name: 'test2', mod: 2, desc: '', effect: 'test effect' },
      { name: 'test5', mod: 5, desc: '', effect: 'test effect' }
    ];
    testQualities = [
      { name: 'testquality1', mod: 1, desc: ''},
      { name: 'testquality2', mod: 2, desc: '', effect: 'generic effect'}
    ];
    testStyles = [
      { name: 'teststyle1', mod: 1, desc: ''},
      { name: 'teststyle2', mod: 2, desc: ''}
    ];
    testArmor = {
      name: 'SP 4', sp: 4,
      mod: { Lt: 1.1, Med: 1.05, Hvy: 1.0 },
      ev: { Lt: 0, Med: 0, Hvy: 0 }
    };
    testArmorArray = [
      {
        name: 'SP 4', sp: 4,
        mod: { Lt: 1.1, Med: 1.05, Hvy: 1.0 },
        ev: { Lt: 0, Med: 0, Hvy: 0 }
      },
      {
        name: 'SP 6', sp: 6,
        mod: { Lt: 1.2, Med: 1.1, Hvy: 1.05 },
        ev: { Lt: 0, Med: 0, Hvy: 0 }
      }
    ];

    fixture = TestBed.createComponent(FashionInputComponent);
    component = fixture.componentInstance;
    component.clothes = testArrayPieces;
    component.styleList = testStyles;
    component.qualityList = testQualities;
    component.armoringList = testArmorArray;
    component.optionsList = testOptions;
    fixture.detectChanges();
  });

  afterEach( () => {
    fixture = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.clothes.length).toEqual(testArrayPieces.length);
    expect(component.styleList.length).toEqual(testStyles.length);
    expect(component.qualityList.length).toEqual(testQualities.length);
    expect(component.armoringList.length).toEqual(testArmorArray.length);
    expect(component.optionsList.length).toEqual(testOptions.length);
  });

  it('should set variable ngOnInit', () => {
    component.ngOnInit();
    expect(component.currClothing).toBeTruthy();
    expect(component.spRatingsList).toBeTruthy();
  });

  it('should change clothing', () => {
    component.changeClothing(testPiece);
    expect(component.currClothing.clothes.name).toEqual(testPiece.name);
  });

  it('should select style', () => {
    component.changeClothing(testPiece);
    component.selectStyle(testStyles[1]);
    expect(component.currClothing.style.name).toEqual(testStyles[1].name);
  });

  it('should select qualtiy', () => {
    component.changeClothing(testPiece);
    component.selectQuality(testQualities[1]);
    expect(component.currClothing.quality.name).toEqual(testQualities[1].name);
  });

  it('should select SP rating', () => {
    component.changeClothing(testPiece);
    component.selectSPRating(testArmorArray[1]);
    expect(component.currClothing.spRating.name).toEqual(testArmorArray[1].name);
  });

  it('should select option', () => {
    component.changeClothing(testPiece);
    const options = testOptions.splice(1, 1);
    component.selectOptions(options);
    expect(component.currClothing.options.length).toEqual(1);
    expect(component.currClothing.options[0].name).toEqual(options[0].name);
  });

  it('should not be purchasable', () => {
    component.changeClothing(testPiece);
    expect(component.isPurchaseable).toEqual(false);
    component.selectQuality(testQualities[1]);
    expect(component.isPurchaseable).toEqual(false);
  });

  it('should be purchasable', () => {
    component.changeClothing(testPiece);
    component.selectQuality(testQualities[1]);
    component.selectStyle(testStyles[1]);
    expect(component.currClothing.clothes.name).toBeTruthy();
    expect(component.currClothing.quality.name).toBeTruthy();
    expect(component.currClothing.style.name).toBeTruthy();
    expect(component.isPurchaseable).toEqual(true);
  });
});
