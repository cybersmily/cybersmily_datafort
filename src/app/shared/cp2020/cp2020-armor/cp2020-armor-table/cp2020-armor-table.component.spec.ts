import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorTableComponent } from './cp2020-armor-table.component';

describe('Cp2020ArmorTableComponent', () => {
  let component: Cp2020ArmorTableComponent;
  let fixture: ComponentFixture<Cp2020ArmorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ArmorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
