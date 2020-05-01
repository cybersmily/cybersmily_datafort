import { HttpClientModule } from '@angular/common/http';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifepathEthnicityComponent } from './lifepath-ethnicity.component';

describe('LifepathEthnicityComponent', () => {
  let component: LifepathEthnicityComponent;
  let fixture: ComponentFixture<LifepathEthnicityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifepathEthnicityComponent ],
      imports: [FormsModule, HttpClientModule],
      providers: [DataService, DiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifepathEthnicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
