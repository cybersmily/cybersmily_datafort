import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CyberdeckListComponent } from './cp2020-cyberdeck-list.component';

describe('Cp2020CyberdeckListComponent', () => {
  let component: Cp2020CyberdeckListComponent;
  let fixture: ComponentFixture<Cp2020CyberdeckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020CyberdeckListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberdeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
