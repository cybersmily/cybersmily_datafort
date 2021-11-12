import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcpaGeneratorMainComponent } from './acpa-generator-main.component';

describe('AcpaGeneratorMainComponent', () => {
  let component: AcpaGeneratorMainComponent;
  let fixture: ComponentFixture<AcpaGeneratorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcpaGeneratorMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcpaGeneratorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
