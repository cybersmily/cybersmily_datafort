import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortToolbarComponent } from './cp2020-datafort-toolbar.component';

describe('Cp2020DatafortToolbarComponent', () => {
  let component: Cp2020DatafortToolbarComponent;
  let fixture: ComponentFixture<Cp2020DatafortToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020DatafortToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020DatafortToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
