import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSettingsComponent } from './armor-settings.component';

describe('ArmorSettingsComponent', () => {
  let component: ArmorSettingsComponent;
  let fixture: ComponentFixture<ArmorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
