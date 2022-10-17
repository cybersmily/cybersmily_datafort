import { Cp2020ContactsModule } from './../../cp2020-contacts.module';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020BigLeagueContactsComponent } from './cp2020-big-league-contacts.component';

describe('Cp2020BigLeagueContactsComponent', () => {
  let component: Cp2020BigLeagueContactsComponent;
  let fixture: ComponentFixture<Cp2020BigLeagueContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2020BigLeagueContactsComponent],
      imports: [CommonUiModule, Cp2020ContactsModule],
      providers: [DiceService, DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(Cp2020BigLeagueContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
