import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RepSectionComponent } from './cp2020-rep-section.component';

describe('Cp2020RepSectionComponent', () => {
  let component: Cp2020RepSectionComponent;
  let fixture: ComponentFixture<Cp2020RepSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonUiModule
      ],
      declarations: [ Cp2020RepSectionComponent ],
      providers: [
        DiceService
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020RepSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
