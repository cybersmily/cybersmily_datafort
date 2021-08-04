import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { LifepathEthnicityComponent } from './../lifepath-ethnicity/lifepath-ethnicity.component';
import { DiceService } from './../../shared/services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { LifepathChartComponent } from '../../shared/cp2020/cp2020-lifepath/lifepath-chart/lifepath-chart.component';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifepathGeneratorComponent } from './lifepath-generator.component';
import { LifepathFamilyComponent } from '../lifepath-family/lifepath-family.component';
import { LifepathEventsComponent } from '../lifepath-events/lifepath-events.component';

describe('LifepathGeneratorComponent', () => {
  let component: LifepathGeneratorComponent;
  let fixture: ComponentFixture<LifepathGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LifepathGeneratorComponent,
        LifepathChartComponent,
        LifepathFamilyComponent,
        LifepathEventsComponent,
        LifepathEthnicityComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule],
      providers: [
        DataService,
        DiceService,
        SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifepathGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
