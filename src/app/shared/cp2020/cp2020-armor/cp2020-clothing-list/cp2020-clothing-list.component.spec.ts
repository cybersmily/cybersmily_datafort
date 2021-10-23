import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ClothingListComponent } from './cp2020-clothing-list.component';

describe('Cp2020ClothingListComponent', () => {
  let component: Cp2020ClothingListComponent;
  let fixture: ComponentFixture<Cp2020ClothingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ClothingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ClothingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
