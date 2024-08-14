import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzUnitFormComponent } from './cr-cz-unit-form.component';

describe('CrCzUnitFormComponent', () => {
  let component: CrCzUnitFormComponent;
  let fixture: ComponentFixture<CrCzUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzUnitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
