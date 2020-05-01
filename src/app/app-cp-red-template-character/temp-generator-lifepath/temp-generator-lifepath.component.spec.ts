import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorLifepathComponent } from './temp-generator-lifepath.component';

describe('TempGeneratorLifepathComponent', () => {
  let component: TempGeneratorLifepathComponent;
  let fixture: ComponentFixture<TempGeneratorLifepathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempGeneratorLifepathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGeneratorLifepathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
