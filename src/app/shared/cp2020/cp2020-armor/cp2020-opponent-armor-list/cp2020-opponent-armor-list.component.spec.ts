import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020OpponentArmorListComponent } from './cp2020-opponent-armor-list.component';

describe('Cp2020OpponenentListComponent', () => {
  let component: Cp2020OpponentArmorListComponent;
  let fixture: ComponentFixture<Cp2020OpponentArmorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020OpponentArmorListComponent ],
      imports: [
        CommonUiModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020OpponentArmorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
