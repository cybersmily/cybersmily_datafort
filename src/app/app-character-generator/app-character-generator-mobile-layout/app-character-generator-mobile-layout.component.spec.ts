import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterGeneratorMobileLayoutComponent } from './app-character-generator-mobile-layout.component';

describe('AppCharacterGeneratorMobileLayoutComponent', () => {
  let component: AppCharacterGeneratorMobileLayoutComponent;
  let fixture: ComponentFixture<AppCharacterGeneratorMobileLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCharacterGeneratorMobileLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCharacterGeneratorMobileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
