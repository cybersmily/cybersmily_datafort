import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightMarketFormComponent } from './night-market-form.component';

describe('NightMarketFormComponent', () => {
  let component: NightMarketFormComponent;
  let fixture: ComponentFixture<NightMarketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightMarketFormComponent ],
      imports: [CommonUiModule,
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
    fixture = TestBed.createComponent(NightMarketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
