import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020BigLeagueContactComponent } from './cp2020-big-league-contact.component';

describe('Cp2020BigLeagueContactComponent', () => {
  let component: Cp2020BigLeagueContactComponent;
  let fixture: ComponentFixture<Cp2020BigLeagueContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020BigLeagueContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020BigLeagueContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
