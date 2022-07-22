import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../common-ui/common-ui.module';
import { GangGeneratorService } from './../../services/gang-generator/gang-generator.service';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GangGeneratorDisplayComponent } from './gang-generator-display.component';

describe('GangGeneratorDisplayComponent', () => {
  let component: GangGeneratorDisplayComponent;
  let fixture: ComponentFixture<GangGeneratorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GangGeneratorDisplayComponent],
      imports: [CommonUiModule, HttpClientTestingModule],
      providers: [DiceService, DataService, GangGeneratorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GangGeneratorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
