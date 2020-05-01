import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifepathFamilyComponent } from './lifepath-family.component';

describe('LifepathFamilyComponent', () => {
  let component: LifepathFamilyComponent;
  let fixture: ComponentFixture<LifepathFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifepathFamilyComponent ],
      imports: [ HttpClientModule],
      providers: [DiceService, DataService]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifepathFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
