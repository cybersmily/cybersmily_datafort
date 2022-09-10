import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020BigLeagueContactsComponent } from './cp2020-big-league-contacts.component';

describe('Cp2020BigLeagueContactsComponent', () => {
  let component: Cp2020BigLeagueContactsComponent;
  let fixture: ComponentFixture<Cp2020BigLeagueContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020BigLeagueContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020BigLeagueContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
