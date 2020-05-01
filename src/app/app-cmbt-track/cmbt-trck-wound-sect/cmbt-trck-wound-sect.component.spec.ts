import { DiceService } from './../../shared/services/dice/dice.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FormsModule } from '@angular/forms';
import { CmbtTrckWoundLevelComponent } from './../cmbt-trck-wound-level/cmbt-trck-wound-level.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckWoundSectComponent } from './cmbt-trck-wound-sect.component';

describe('CmbtTrckWoundSectComponent', () => {
  let component: CmbtTrckWoundSectComponent;
  let fixture: ComponentFixture<CmbtTrckWoundSectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CmbtTrckWoundSectComponent,
        CmbtTrckWoundLevelComponent
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
    fixture = TestBed.createComponent(CmbtTrckWoundSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
