import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Game2d10Component } from './game2d10.component';

describe('Game2d10Component', () => {
  let component: Game2d10Component;
  let fixture: ComponentFixture<Game2d10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Game2d10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Game2d10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
