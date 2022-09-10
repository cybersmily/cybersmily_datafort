import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020BigLeagueContactNewComponent } from './cp2020-big-league-contact-new.component';

describe('Cp2020BigLeagueContactNewComponent', () => {
  let component: Cp2020BigLeagueContactNewComponent;
  let fixture: ComponentFixture<Cp2020BigLeagueContactNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020BigLeagueContactNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020BigLeagueContactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
