import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorNewComponent } from './cp2020-armor-new.component';

describe('Cp2020ArmorNewComponent', () => {
  let component: Cp2020ArmorNewComponent;
  let fixture: ComponentFixture<Cp2020ArmorNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ArmorNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
