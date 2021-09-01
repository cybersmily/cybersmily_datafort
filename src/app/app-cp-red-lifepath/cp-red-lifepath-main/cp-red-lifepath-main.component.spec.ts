import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedLifepathMainComponent } from './cp-red-lifepath-main.component';

describe('CpRedLifepathMainComponent', () => {
  let component: CpRedLifepathMainComponent;
  let fixture: ComponentFixture<CpRedLifepathMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedLifepathMainComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedLifepathMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
