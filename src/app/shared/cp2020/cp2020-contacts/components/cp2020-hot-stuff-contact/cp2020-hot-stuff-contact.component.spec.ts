import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020HotStuffContactComponent } from './cp2020-hot-stuff-contact.component';

describe('Cp2020HotStuffContactComponent', () => {
  let component: Cp2020HotStuffContactComponent;
  let fixture: ComponentFixture<Cp2020HotStuffContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020HotStuffContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020HotStuffContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
