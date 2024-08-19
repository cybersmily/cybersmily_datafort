import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterGeneratorFullLayoutComponent } from './app-character-generator-full-layout.component';

describe('AppCharacterGeneratorFullLayoutComponent', () => {
  let component: AppCharacterGeneratorFullLayoutComponent;
  let fixture: ComponentFixture<AppCharacterGeneratorFullLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCharacterGeneratorFullLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCharacterGeneratorFullLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
