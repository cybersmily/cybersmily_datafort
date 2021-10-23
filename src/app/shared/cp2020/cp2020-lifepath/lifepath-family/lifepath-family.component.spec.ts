import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FamilyGeneratorService } from './../services/family-generator.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { DataService } from './../../../services/file-services';
import { DiceService } from './../../../services/dice/dice.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifepathFamilyComponent } from './lifepath-family.component';
import { Siblings, LifepathFamily } from './../models';

describe('LifepathFamilyComponent', () => {
  let component: LifepathFamilyComponent;
  let fixture: ComponentFixture<LifepathFamilyComponent>;
  let testFamily: LifepathFamily;

  beforeEach(waitForAsync(() => {
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
