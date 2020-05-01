import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorArmorComponent } from './temp-generator-armor.component';

describe('TempGeneratorArmorComponent', () => {
  let component: TempGeneratorArmorComponent;
  let fixture: ComponentFixture<TempGeneratorArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempGeneratorArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGeneratorArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
