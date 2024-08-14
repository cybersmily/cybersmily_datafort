import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzGearCardComponent } from './cr-cz-gear-card.component';

describe('CrCzGearCardComponent', () => {
  let component: CrCzGearCardComponent;
  let fixture: ComponentFixture<CrCzGearCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzGearCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzGearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
