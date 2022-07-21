import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GangGeneratorMainComponent } from './gang-generator-main.component';

describe('GangGeneratorMainComponent', () => {
  let component: GangGeneratorMainComponent;
  let fixture: ComponentFixture<GangGeneratorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GangGeneratorMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GangGeneratorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
