import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FamilyGeneratorService } from './../../shared/services/lifepath/family-generator.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifepathFamilyComponent } from './lifepath-family.component';
import { Siblings, LifepathFamily } from './../../shared/models/lifepath';

describe('LifepathFamilyComponent', () => {
  let component: LifepathFamilyComponent;
  let fixture: ComponentFixture<LifepathFamilyComponent>;
  let testFamily: LifepathFamily;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifepathFamilyComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DiceService,
        DataService,
        FamilyGeneratorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testFamily = { familyRanking: 'Test', familyBackground: 'Test', siblings: new Siblings()};
    fixture = TestBed.createComponent(LifepathFamilyComponent);
    component = fixture.componentInstance;
    component.generatedFamily = testFamily;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate family', () => {
    component.generateFamily();
    fixture.detectChanges();
    expect(component.generatedFamily.familyRanking).not.toEqual(testFamily.familyRanking);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
