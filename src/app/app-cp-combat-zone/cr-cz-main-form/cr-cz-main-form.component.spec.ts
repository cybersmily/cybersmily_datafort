import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzMainFormComponent } from './cr-cz-main-form.component';

describe('CrCzMainFormComponent', () => {
  let component: CrCzMainFormComponent;
  let fixture: ComponentFixture<CrCzMainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzMainFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
