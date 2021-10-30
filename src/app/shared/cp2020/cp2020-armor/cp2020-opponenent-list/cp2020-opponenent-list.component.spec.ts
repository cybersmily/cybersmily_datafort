import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020OpponenentListComponent } from './cp2020-opponenent-list.component';

describe('Cp2020OpponenentListComponent', () => {
  let component: Cp2020OpponenentListComponent;
  let fixture: ComponentFixture<Cp2020OpponenentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020OpponenentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020OpponenentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
