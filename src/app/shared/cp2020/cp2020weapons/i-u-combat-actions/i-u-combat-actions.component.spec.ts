import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IUCombatActionsComponent } from './i-u-combat-actions.component';

describe('IUCombatActionsComponent', () => {
  let component: IUCombatActionsComponent;
  let fixture: ComponentFixture<IUCombatActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IUCombatActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IUCombatActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
