import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckManagerMainComponent } from './deck-manager-main.component';

describe('ProgramMainComponent', () => {
  let component: DeckManagerMainComponent;
  let fixture: ComponentFixture<DeckManagerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckManagerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckManagerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
