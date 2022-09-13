import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020OtherContactsComponent } from './cp2020-other-contacts.component';

describe('Cp2020OtherContactsComponent', () => {
  let component: Cp2020OtherContactsComponent;
  let fixture: ComponentFixture<Cp2020OtherContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020OtherContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020OtherContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
