import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020OtherContactComponent } from './cp2020-other-contact.component';

describe('Cp2020OtherContactComponent', () => {
  let component: Cp2020OtherContactComponent;
  let fixture: ComponentFixture<Cp2020OtherContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020OtherContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020OtherContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
