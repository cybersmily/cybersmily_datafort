import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorClothingListComponent } from './cp2020-armor-clothing-list.component';

describe('Cp2020ArmorClothingListComponent', () => {
  let component: Cp2020ArmorClothingListComponent;
  let fixture: ComponentFixture<Cp2020ArmorClothingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ArmorClothingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorClothingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
