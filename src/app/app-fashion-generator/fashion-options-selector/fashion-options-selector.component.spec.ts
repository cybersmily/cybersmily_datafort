import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionOptionsSelectorComponent } from './fashion-options-selector.component';

describe('FashionOptionsSelectorComponent', () => {
  let component: FashionOptionsSelectorComponent;
  let fixture: ComponentFixture<FashionOptionsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionOptionsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionOptionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
