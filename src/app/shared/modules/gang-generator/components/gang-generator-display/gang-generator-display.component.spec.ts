import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GangGeneratorDisplayComponent } from './gang-generator-display.component';

describe('GangGeneratorDisplayComponent', () => {
  let component: GangGeneratorDisplayComponent;
  let fixture: ComponentFixture<GangGeneratorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GangGeneratorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GangGeneratorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
