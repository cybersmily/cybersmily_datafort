import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionClothesSelectorComponent } from './fashion-clothes-selector.component';
import { FormsModule } from '@angular/forms';

describe('FashionClothesSelectorComponent', () => {
  let component: FashionClothesSelectorComponent;
  let fixture: ComponentFixture<FashionClothesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionClothesSelectorComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionClothesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
