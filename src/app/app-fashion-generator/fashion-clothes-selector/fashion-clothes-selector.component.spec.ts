import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FashionClothesSelectorComponent } from './fashion-clothes-selector.component';
import { FormsModule } from '@angular/forms';

describe('FashionClothesSelectorComponent', () => {
  let component: FashionClothesSelectorComponent;
  let fixture: ComponentFixture<FashionClothesSelectorComponent>;

  beforeEach(waitForAsync(() => {
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
