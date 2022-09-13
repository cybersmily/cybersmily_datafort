import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020HotStuffContactsComponent } from './cp2020-hot-stuff-contacts.component';

describe('Cp2020HotStuffContactsComponent', () => {
  let component: Cp2020HotStuffContactsComponent;
  let fixture: ComponentFixture<Cp2020HotStuffContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020HotStuffContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020HotStuffContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
