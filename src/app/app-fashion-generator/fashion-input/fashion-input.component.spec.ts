import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FormsModule } from '@angular/forms';
import { FashionOptionsSelectorComponent } from './../fashion-options-selector/fashion-options-selector.component';
import { FashionSelectorComponent } from './../fashion-selector/fashion-selector.component';
import { FashionClothesSelectorComponent } from './../fashion-clothes-selector/fashion-clothes-selector.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionInputComponent } from './fashion-input.component';

describe('FashionInputComponent', () => {
  let component: FashionInputComponent;
  let fixture: ComponentFixture<FashionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FashionInputComponent,
        FashionClothesSelectorComponent,
        FashionSelectorComponent,
        FashionOptionsSelectorComponent
      ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
