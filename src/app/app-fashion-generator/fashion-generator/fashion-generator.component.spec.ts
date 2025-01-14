import { Cp2020ArmorModule } from './../../shared/cp2020/cp2020-armor/cp2020-armor.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FashionGeneratorComponent } from './fashion-generator.component';
import { DataService } from './../../shared/services/file-services';

describe('FashionGeneratorComponent', () => {
  let component: FashionGeneratorComponent;
  let fixture: ComponentFixture<FashionGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FashionGeneratorComponent
       ],
       imports: [
         CommonUiModule,
         HttpClientTestingModule,
         Cp2020ArmorModule
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
