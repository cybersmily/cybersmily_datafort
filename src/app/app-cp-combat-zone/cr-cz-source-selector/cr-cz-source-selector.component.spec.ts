import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzSourceSelectorComponent } from './cr-cz-source-selector.component';

describe('CrCzSourceSelectorComponent', () => {
  let component: CrCzSourceSelectorComponent;
  let fixture: ComponentFixture<CrCzSourceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzSourceSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzSourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
