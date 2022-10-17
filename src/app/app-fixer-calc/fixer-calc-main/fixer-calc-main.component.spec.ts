import { Cp2020ContactsModule } from './../../shared/cp2020/cp2020-contacts/cp2020-contacts.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcMainComponent } from './fixer-calc-main.component';

describe('FixerCalcMainComponent', () => {
  let component: FixerCalcMainComponent;
  let fixture: ComponentFixture<FixerCalcMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiModule, HttpClientTestingModule, Cp2020ContactsModule],
      declarations: [FixerCalcMainComponent],
      providers: [SeoService, DataService, DiceService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
