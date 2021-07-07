import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditFormComponent } from './vendit-form.component';

describe('VenditFormComponent', () => {
  let component: VenditFormComponent;
  let fixture: ComponentFixture<VenditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
