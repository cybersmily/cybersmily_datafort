import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzUnitListComponent } from './cr-cz-unit-list.component';

describe('CrCzUnitListComponent', () => {
  let component: CrCzUnitListComponent;
  let fixture: ComponentFixture<CrCzUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzUnitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
