import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorWeaponsComponent } from './temp-generator-weapons.component';

describe('TempGeneratorWeaponsComponent', () => {
  let component: TempGeneratorWeaponsComponent;
  let fixture: ComponentFixture<TempGeneratorWeaponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempGeneratorWeaponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGeneratorWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
