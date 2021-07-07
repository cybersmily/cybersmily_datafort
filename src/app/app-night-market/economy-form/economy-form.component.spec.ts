import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyFormComponent } from './economy-form.component';

describe('EconomyFormComponent', () => {
  let component: EconomyFormComponent;
  let fixture: ComponentFixture<EconomyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconomyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
