import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzProgramCardComponent } from './cr-cz-program-card.component';

describe('CrCzProgramCardComponent', () => {
  let component: CrCzProgramCardComponent;
  let fixture: ComponentFixture<CrCzProgramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzProgramCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzProgramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
