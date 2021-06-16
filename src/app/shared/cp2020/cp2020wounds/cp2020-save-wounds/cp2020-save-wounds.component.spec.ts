import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020SaveWoundsComponent } from './cp2020-save-wounds.component';

describe('Cp2020SaveWoundsComponent', () => {
  let component: Cp2020SaveWoundsComponent;
  let fixture: ComponentFixture<Cp2020SaveWoundsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020SaveWoundsComponent ],
      imports: [CommonUiModule],
      providers: [
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SaveWoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
