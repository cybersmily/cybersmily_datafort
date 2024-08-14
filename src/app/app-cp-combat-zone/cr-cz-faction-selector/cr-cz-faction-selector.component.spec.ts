import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzFactionSelectorComponent } from './cr-cz-faction-selector.component';

describe('CrCzFactionSelectorComponent', () => {
  let component: CrCzFactionSelectorComponent;
  let fixture: ComponentFixture<CrCzFactionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzFactionSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzFactionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
